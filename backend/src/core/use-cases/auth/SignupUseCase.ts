import { SignupRequestDTO, SignupResponseDTO } from "../../dto/auth/SignupDTO";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IPasswordService } from "../../services/IPasswordService";
import { ITokenService } from "../../services/ITokenService";
import { Types } from "../../../infra/container/types";
import { inject, injectable } from "inversify";
import { IUnitWork } from "../../uow/IUnitWork";
import {
  EmailAlreadyExistsError,
  SubdomainAlreadyExistsError,
} from "../../../shared/errors";

@injectable()
export class SignupUseCase {
  constructor(
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,

    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,

    @inject(Types.PasswordService)
    private passwordService: IPasswordService,

    @inject(Types.TokenService)
    private tokenService: ITokenService,

    @inject(Types.UnitOfWork)
    private uow: IUnitWork,
  ) {}

  async execute(req: SignupRequestDTO): Promise<{
    response: SignupResponseDTO;
    refreshToken: string;
  }> {
    const existingCompany = await this.companyRepository.findByEmail(
      req.companyEmail,
    );
    if (existingCompany) {
      throw new EmailAlreadyExistsError("Company email already registered");
    }

    const existingSubdomain = await this.companyRepository.findBySubDomain(
      req.subdomain,
    );
    if (existingSubdomain) {
      throw new SubdomainAlreadyExistsError("Subdomain already exists");
    }

    const existingUser = await this.userRepository.findByEmail(req.adminEmail);
    if (existingUser) {
      throw new EmailAlreadyExistsError("Admin email already registered");
    }

    const hashedPassword = await this.passwordService.hash(req.password);

    await this.uow.begin();

    try {
      const company = await this.companyRepository.create(
        {
          name: req.companyName,
          email: req.companyEmail,
          subdomain: req.subdomain,
          status: "active",
          subscriptionPlan: "trial",
          subscriptionStatus: "active",
        },
        this.uow,
      );

      const user = await this.userRepository.create(
        {
          firstName: req.adminFirstName,
          lastName: req.adminLastName,
          email: req.adminEmail,
          password: hashedPassword,
          role: "admin",
          status: "active",
          companyId: company.id,
        },
        this.uow,
      );

      const tokens = this.tokenService.generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
        companyId: company.id,
      });

      await this.uow.commit();

      const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);

      return {
        response: {
          success: true,
          message: "Company created successfully",
          data: {
            company: {
              id: company.id,
              name: company.name,
              email: company.email,
              status: company.status,
              createdAt: company.createdAt.toISOString(),
            },
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              status: user.status,
            },
            token: tokens.accessToken,
            expiresAt: expiresAt.toISOString(),
          },
        },
        refreshToken: tokens.refreshToken,
      };
    } catch (error: any) {
      await this.uow.rollback();

      if (error.code === 11000) {
        if (error.keyPattern?.subdomain) {
          throw new SubdomainAlreadyExistsError(
            "Subdomain was just taken. Please try another.",
          );
        }
      }

      throw error;
    }
  }
}
