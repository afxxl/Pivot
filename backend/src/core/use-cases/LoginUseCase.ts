import {
  CompanyNotFoundError,
  InvalidCredentialsError,
  UserNotFoundError,
} from "../../shared/errors/AuthError";
import { LoginResponseDTO, LoginRequestDTO } from "../dto/LoginDTO";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IWorkspaceRepository } from "../repositories/IWorkspaceRepository";
import { IPasswordService } from "../services/IPasswordService";
import { ITokenService, TokenResponse } from "../services/ITokenService";

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private companyRepository: ICompanyRepository,
    private workspaceRepository: IWorkspaceRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService,
  ) {}

  async execute(req: LoginRequestDTO): Promise<{
    response: LoginResponseDTO;
    refreshToken: string;
  }> {
    const user = await this.userRepository.findByEmail(req.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.passwordService.compare(
      req.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    if (!user.companyId) {
      throw new UserNotFoundError("User is not associated with any company");
    }

    const company = await this.companyRepository.findById(user.companyId);
    if (!company) {
      throw new CompanyNotFoundError();
    }

    const workspaceEntities = await this.workspaceRepository.findByUserId(
      user.id,
    );
    const workspaces = workspaceEntities.map((ws) => ({
      id: ws.id,
      name: ws.name,
    }));

    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
    });

    const tokens: TokenResponse = this.tokenService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    let redirectTo = "/member/dashboard";
    if (user.role === "workspace_admin") {
      redirectTo = "/workspace-admin/dashboard";
    } else if (user.role === "project_manager") {
      redirectTo = "/pm/dashboard";
    }

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
