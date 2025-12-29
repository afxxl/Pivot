import { inject, injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IWorkspaceRepository } from "../../repositories/IWorkspaceRepository";
import {
  sendWorkspaceInviteRequestDTO,
  sendWorkspaceInviteResponseDTO,
} from "../../dto/invite/SendWorkspaceInviteDTO";
import { IWorkspaceMemberRepository } from "../../repositories/IWorkspaceMemberRepository";
import { directAddToWorkspaceTemplate } from "../../../shared/emailTemplates/invite";
import { sendWorkspaceInviteTemplate } from "../../../shared/emailTemplates/invite";
import { IEmailService } from "../../services/IEmailService";
import { IInviteRepository } from "../../repositories/IInviteRepository";
import { IUnitWork } from "../../uow/IUnitWork";
import {
  CannotInviteSelfError,
  CompanyNotFoundError,
  EmailAlreadyExistsError,
  InviteAlreadySentError,
  UnauthorizedError,
  UserNotFoundError,
  WorkspaceNotFoundError,
} from "../../../shared/errors";

@injectable()
export class SendWorkspaceInviteUseCase {
  constructor(
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,
    @inject(Types.WorkspaceRepository)
    private workspaceRepository: IWorkspaceRepository,
    @inject(Types.WorkspaceMemberRepository)
    private workspaceMember: IWorkspaceMemberRepository,
    @inject(Types.EmailService)
    private emailService: IEmailService,
    @inject(Types.InviteRepository)
    private inviteRepository: IInviteRepository,
    @inject(Types.UnitOfWork)
    private uow: IUnitWork,
    @inject(Types.Logger)
    private logger: ILogger,
  ) {}

  async execute(
    req: sendWorkspaceInviteRequestDTO,
    userId: string,
    companyId: string,
  ): Promise<{ response: sendWorkspaceInviteResponseDTO }> {
    const invitedBy = await this.userRepository.findById(userId);
    if (!invitedBy) {
      throw new UserNotFoundError("User not found");
    }

    const workspace = await this.workspaceRepository.findById(req.workspaceId);
    if (!workspace) {
      throw new WorkspaceNotFoundError("Workspace not found");
    }

    if (workspace.companyId !== companyId) {
      throw new WorkspaceNotFoundError("Workspace not found");
    }

    if (invitedBy.role === "workspace_admin") {
      const workspaceMember = await this.workspaceMember.findWorkspaceAndUser(
        req.workspaceId,
        userId,
        "workspace_admin",
      );

      if (!workspaceMember) {
        throw new UnauthorizedError("You're not admin of this workspace");
      }
    }

    if (req.email.toLowerCase() === invitedBy.email.toLowerCase()) {
      throw new CannotInviteSelfError("You cannot invite yourself");
    }

    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    const existingUser = await this.userRepository.findByEmailAndCompanyId(
      req.email,
      companyId,
    );

    if (existingUser && existingUser.status === "active") {
      const workspaceMember = await this.workspaceMember.findWorkspaceAndUser(
        req.workspaceId,
        existingUser.id,
      );

      if (workspaceMember) {
        throw new EmailAlreadyExistsError(
          "User is already a member of this workspace",
        );
      }

      await this.uow.begin();
      try {
        await this.workspaceMember.create(
          {
            workspaceId: req.workspaceId,
            userId: existingUser.id,
            role: req.role,
            joinedAt: new Date(),
          },
          this.uow,
        );

        await this.uow.commit();
      } catch (error) {
        await this.uow.rollback();
        throw error;
      }

      const roleRedirects: Record<string, string> = {
        workspace_admin: "/workspace-admin/dashboard",
        project_manager: "/pm/dashboard",
        member: "/member/dashboard",
      };

      const { subject, html } = directAddToWorkspaceTemplate({
        firstName: existingUser.firstName,
        inviterName: `${invitedBy.firstName} ${invitedBy.lastName}`,
        workspaceName: workspace.name,
        companyName: company.name,
        role: req.role,
        loginLink: `https://${company.subdomain}.pivot.app${roleRedirects[req.role]}`,
      });

      try {
        await this.emailService.sendMail({
          to: req.email,
          subject,
          html,
        });
      } catch (error) {
        this.logger.error("Failed to send direct add email", {
          email: req.email,
          workspaceId: req.workspaceId,
          error,
        });
      }

      return {
        response: {
          success: true,
          message: "User added to workspace successfully",
          data: {
            type: "direct_add",
            email: req.email,
            role: req.role,
            workspace: {
              id: workspace.id,
              name: workspace.name,
            },
            invitedBy: {
              id: invitedBy.id,
              name: `${invitedBy.firstName} ${invitedBy.lastName}`,
              email: invitedBy.email,
            },
          },
        },
      };
    }

    const existingInvite =
      await this.inviteRepository.findByWorkspaceIdAndEmail(
        req.workspaceId,
        req.email.toLowerCase(),
      );

    if (existingInvite && existingInvite.status === "pending") {
      if (existingInvite.expiresAt > new Date()) {
        throw new InviteAlreadySentError(
          "Invitation already sent to this workspace. Use resend feature.",
        );
      } else {
        await this.inviteRepository.delete(existingInvite.id);
      }
    }

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await this.inviteRepository.create({
      token,
      email: req.email.toLowerCase(),
      firstName: req.firstName,
      lastName: req.lastName,
      role: req.role,
      companyId,
      workspaceId: req.workspaceId,
      invitedBy: userId,
      status: "pending",
      expiresAt,
    });

    const { subject, html } = sendWorkspaceInviteTemplate({
      firstName: req.firstName,
      inviterName: `${invitedBy.firstName} ${invitedBy.lastName}`,
      companyName: company.name,
      workspaceName: workspace.name,
      role: req.role,
      inviteLink: `https://${company.subdomain}.pivot.app/accept-invite?token=${token}`,
      expiresInDays: 7,
    });

    try {
      await this.emailService.sendMail({
        to: req.email,
        subject,
        html,
      });
    } catch (error) {
      this.logger.error("Failed to send workspace invite email", {
        email: req.email,
        workspaceId: req.workspaceId,
        error,
      });
    }

    return {
      response: {
        success: true,
        message: "Invitation sent successfully",
        data: {
          type: "invitation",
          invitedId: invitation.id,
          email: req.email,
          role: req.role,
          workspace: {
            id: workspace.id,
            name: workspace.name,
          },
          expiresAt: invitation.expiresAt.toISOString(),
          invitedBy: {
            id: invitedBy.id,
            name: `${invitedBy.firstName} ${invitedBy.lastName}`,
            email: invitedBy.email,
          },
        },
      },
    };
  }
}
