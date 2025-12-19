import {
  CompanyInactiveError,
  CompanyNotFoundError,
  InvalidCredentialsError,
  SubdomainNotFoundError,
  UserInactiveError,
  UserInvitedError,
  UserNotFoundError,
} from "../../shared/errors/AuthError";
import { LoginResponseDTO, LoginRequestDTO } from "../dto/LoginDTO";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IWorkspaceRepository } from "../repositories/IWorkspaceRepository";
import { IPasswordService } from "../services/IPasswordService";
import { ITokenService, TokenResponse } from "../services/ITokenService";
import { injectable, inject } from "inversify";
import { Types } from "../../infra/container/types";
import { ILogger } from "../services/ILogger";

@injectable()
export class LoginUseCase {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,

    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,

    @inject(Types.WorkspaceRepository)
    private workspaceRepository: IWorkspaceRepository,

    @inject(Types.PasswordService)
    private passwordService: IPasswordService,

    @inject(Types.TokenService)
    private tokenService: ITokenService,

    @inject(Types.Logger)
    private logger: ILogger,
  ) {}

  async execute(
    req: LoginRequestDTO,
    subdomain: string,
  ): Promise<{
    response: LoginResponseDTO;
    refreshToken: string;
  }> {
    const company = await this.companyRepository.findBySubDomain(subdomain);

    if (!company) {
      throw new SubdomainNotFoundError("Please check the URL");
    }
    if (company.status === "inactive") {
      throw new CompanyInactiveError(
        "This company account is inactive. Please contact support.",
      );
    }

    const user = await this.userRepository.findByEmailAndCompanyId(
      req.email,
      company.id,
    );
    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (user.status !== "active") {
      if (user.status === "invited") {
        throw new UserInvitedError(
          "Please complete your account setup. Check your email for invite link.",
        );
      }
      if (user.status === "inactive") {
        throw new UserInactiveError(
          "Your account is deactivated. Please contact your workspace admin.",
        );
      }
    }

    const isPasswordValid = await this.passwordService.compare(
      req.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn("Login failed - Invalid credentials", {
        email: req.email,
        companyid: company.id,
        subdomain: subdomain,
        timestamp: new Date().toISOString(),
      });

      throw new InvalidCredentialsError();
    }

    this.logger.info("Login successful", {
      userId: user.id,
      email: user.email,
      companyid: company.id,
      subdomain: subdomain,
      timestamp: new Date().toISOString(),
    });

    if (!user.companyId || user.companyId !== company.id) {
      this.logger.error("User companyId mismatch or missing", {
        userId: user.id,
        usercompanyId: user.companyId,
        expectedCompanyId: company.id,
      });

      throw new UserNotFoundError("User not found");
    }

    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
    });

    const workspaceEntities = await this.workspaceRepository.findByUserId(
      user.id,
    );
    const workspaces = workspaceEntities.map((ws) => ({
      id: ws.id,
      name: ws.name,
    }));

    const tokens: TokenResponse = this.tokenService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: company.id,
    });

    const roleRedirects = {
      workspace_admin: "/workspace-admin/dashboard",
      project_manager: "/pm/dashboard",
      member: "/member/dashboard",
    };

    let redirectTo = roleRedirects[user.role] || "/member/dashboard";

    return {
      response: {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status,
            company: {
              id: company.id,
              name: company.name,
              subdomain: company.subdomain,
            },
            workspaces,
          },
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn,
          tokenType: tokens.tokenType,
        },
        redirectTo,
      },
      refreshToken: tokens.refreshToken,
    };
  }
}
