import {
  InvalidInviteTokenError,
  InvalidTokenFormatError,
  InvitationAlreadyAcceptedError,
  InviteCancelledError,
  InviteExpiredError,
} from "../../shared/errors/inviteError";
import {
  VerifyInviteRequestDTO,
  VerifyInviteResponseDTO,
} from "../dto/VerifyInviteDTO";
import { IInviteRepository } from "../repositories/IInviteRepository";
import { injectable, inject } from "inversify";
import { Types } from "../../infra/container/types";
import {
  CompanyInactiveError,
  CompanyNotFoundError,
  CompanySuspendedError,
  WorkspaceNotFoundError,
} from "../../shared/errors/AuthError";
import { IWorkspaceRepository } from "../repositories/IWorkspaceRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { ILogger } from "../services/ILogger";

@injectable()
export class VerifyTokenUseCase {
  constructor(
    @inject(Types.InviteRepository)
    private inviteRepository: IInviteRepository,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
    @inject(Types.WorkspaceRepository)
    private workspaceRepository: IWorkspaceRepository,
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,
    @inject(Types.Logger)
    private logger: ILogger,
  ) {}

  async execute(
    req: VerifyInviteRequestDTO,
  ): Promise<{ response: VerifyInviteResponseDTO }> {
    const { token: rawToken } = req;

    if (!rawToken || !rawToken.trim()) {
      throw new InvalidInviteTokenError(
        "Invalid invitation link. This invitation does not exist.",
      );
    }

    const token = rawToken.trim().toLowerCase();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidV4Regex.test(token)) {
      throw new InvalidTokenFormatError("Invalid invitation link format");
    }

    const invitation = await this.inviteRepository.findByToken(token);

    if (!invitation) {
      this.logger.warn("Invite verification failed - token not found", {
        token: token.substring(0, 8) + "...",
      });
      throw new InvalidInviteTokenError("Invalid invite token");
    }

    if (invitation.status === "accepted") {
      throw new InvitationAlreadyAcceptedError(
        "This invitation has already been used. Please login to your account.",
      );
    }

    if (invitation.status === "cancelled") {
      throw new InviteCancelledError(
        "This invitation has been cancelled. Please contact your company administrator if you believe this is a mistake.",
      );
    }

    if (invitation.status === "expired") {
      throw new InviteExpiredError(
        "This invitation has expired. Please contact the person who invited you to request a new invitation.",
      );
    }

    const now = new Date();

    if (invitation.expiresAt < now) {
      await this.inviteRepository.update(invitation.id, { status: "expired" });
      throw new InviteExpiredError(
        "This invitation has expired. Please contact the person who invited you to request a new invitation.",
      );
    }

    const company = await this.companyRepository.findById(invitation.companyId);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    if (company.status === "inactive") {
      throw new CompanyInactiveError(
        "The company account is currently inactive. Please contact support for assistance.",
      );
    }

    if (company.status === "suspended") {
      throw new CompanySuspendedError(
        "The company account is currently suspended. Please contact support for assistance.",
      );
    }

    if (company.status === "deleted") {
      throw new CompanyNotFoundError(
        "The company associated with this invitation no longer exists.",
      );
    }

    let workspaceData: { id: string; name: string } | undefined = undefined;

    if (invitation.workspaceId) {
      const workspace = await this.workspaceRepository.findById(
        invitation.workspaceId,
      );

      if (!workspace) {
        throw new WorkspaceNotFoundError(
          "The workspace you were invited to no longer exists. Please contact the person who invited you.",
        );
      }

      if (workspace.companyId !== invitation.companyId) {
        this.logger.error("Workspace company mismatch", {
          workspaceId: workspace.id,
          workspaceCompanyId: workspace.companyId,
          invitationCompanyId: invitation.companyId,
        });
        throw new WorkspaceNotFoundError("Workspace not found. Invalid invite");
      }

      workspaceData = {
        id: workspace.id,
        name: workspace.name,
      };
    }

    const inviter = await this.userRepository.findById(invitation.invitedBy);

    const inviterInfo = inviter
      ? {
          id: inviter.id,
          name: `${inviter.firstName} ${inviter.lastName}`,
          role: inviter.role,
        }
      : {
          id: invitation.invitedBy,
          name: "Former Team Member",
          role: "unknown",
        };

    this.logger.info("Invite verified successfully", {
      invitationId: invitation.id,
      email: invitation.email,
      companyId: invitation.companyId,
      hasWorkspace: !!workspaceData,
    });

    return {
      response: {
        success: true,
        data: {
          email: invitation.email,
          firstName: invitation.firstName,
          lastName: invitation.lastName,
          role: invitation.role,
          company: {
            id: company.id,
            name: company.name,
          },
          ...(workspaceData && { workspace: workspaceData }),
          invitedBy: inviterInfo,
          invitedAt: invitation.createdAt.toISOString(),
          expiresAt: invitation.expiresAt.toISOString(),
        },
      },
    };
  }
}
