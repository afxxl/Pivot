import { LoginRequestDTO, LoginResponseDTO } from "../../dto/auth/LoginDTO";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordService } from "../../services/IPasswordService";
import { ITokenService } from "../../services/ITokenService";
import { injectable, inject } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { getPermissions, getRedirectPath } from "./authHelpers";
import {
  CompanyInactiveError,
  InvalidCredentialsError,
  SubdomainNotFoundError,
  UserInactiveError,
  UserInvitedError,
  UserNotFoundError,
} from "../../../shared/errors";

@injectable()
export class LoginUseCase {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,

    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,

    @inject(Types.PasswordService)
    private passwordService: IPasswordService,

    @inject(Types.TokenService)
    private tokenService: ITokenService,

    @inject(Types.Logger)
    private logger: ILogger,
  ) { }

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
          "Your account is deactivated. Please contact your admin.",
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
        companyId: company.id,
        subdomain: subdomain,
        timestamp: new Date().toISOString(),
      });

      throw new InvalidCredentialsError();
    }

    this.logger.info("Login successful", {
      userId: user.id,
      email: user.email,
      companyId: company.id,
      subdomain: subdomain,
      timestamp: new Date().toISOString(),
    });

    if (!user.companyId || user.companyId !== company.id) {
      this.logger.error("User companyId mismatch or missing", {
        userId: user.id,
        userCompanyId: user.companyId,
        expectedCompanyId: company.id,
      });

      throw new UserNotFoundError("User not found");
    }

    await this.userRepository.update(user.id, {
      lastLogin: new Date(),
    });

    const tokens = this.tokenService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
      companyId: company.id,
    });

    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);

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
            permissions: getPermissions(user.role),
          },
          token: tokens.accessToken,
          expiresAt: expiresAt.toISOString(),
          redirectTo: getRedirectPath(user.role),
        },
      },
      refreshToken: tokens.refreshToken,
    };
  }
}
