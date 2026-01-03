import { inject, injectable } from "inversify";
import { ILogger } from "../../services/ILogger";
import { Types } from "../../../infra/container/types";
import {
  SuperAdminLoginRequestDTO,
  SuperAdminLoginResponseDTO,
} from "../../dto/super-admin/SuperAdminLoginDTO";
import { InvalidSuperAdminCredentialsError } from "../../../shared/errors/super-admin/InvalidSuperAdminCredentialsError";
import { IPasswordService } from "../../services/IPasswordService";
import { ITokenService } from "../../services/ITokenService";

@injectable()
export class SuperAdminLoginUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.PasswordService)
    private passwordService: IPasswordService,
    @inject(Types.TokenService)
    private tokenService: ITokenService,
  ) {}

  async execute(
    req: SuperAdminLoginRequestDTO,
  ): Promise<{ response: SuperAdminLoginResponseDTO }> {
    let superAdminEmail = process.env.SUPER_ADMIN_EMAIL as string;
    let superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

    if (!superAdminEmail || !superAdminPassword) {
      this.logger.error("Super admin credentials not configured", {
        timestamp: new Date().toISOString(),
      });
      throw new Error("Super admin configuration is missing");
    }

    if (superAdminEmail.toLowerCase() !== req.email.toLowerCase()) {
      this.logger.warn("Invalid super admin login attempt", {
        email: req.email,
        timestamp: new Date().toISOString(),
      });
      throw new InvalidSuperAdminCredentialsError("Invalid email or password");
    }

    let isPasswordMatch = await this.passwordService.compare(
      req.password,
      superAdminPassword,
    );

    if (!isPasswordMatch) {
      this.logger.warn("Invalid super admin login attempt", {
        email: req.email,
        timestamp: new Date().toISOString(),
      });
      throw new InvalidSuperAdminCredentialsError("Invalid email or password");
    }

    const tokens = this.tokenService.generateTokenPair({
      email: req.email,
      role: "super_admin",
    });

    const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);

    this.logger.info("Super admin logged in successfully", {
      email: req.email,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: "super_001",
            email: superAdminEmail,
            firstName: "Super",
            lastName: "Admin",
            role: "super_admin",
            status: "active",
            permissions: {
              managePlatform: true,
              manageCompanies: true,
              manageSubscriptions: true,
              viewAllData: true,
            },
          },
          token: tokens.accessToken,
          expiresAt: expiresAt.toISOString(),
        },
      },
    };
  }
}
