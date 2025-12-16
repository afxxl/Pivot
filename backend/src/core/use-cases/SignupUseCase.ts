import { EmailAlreadyExistsError } from "../../shared/errors/AuthError";
import { SignupRequestDTO, SignupResponseDTO } from "../dto/SignupDTO";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { IPasswordService } from "../services/IPasswordService";
import { ITokenService } from "../services/ITokenService";

export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private companyRepository: ICompanyRepository,
    private passwordService: IPasswordService,
    private tokenService: ITokenService,
  ) {}

  async execute(req: SignupRequestDTO): Promise<SignupResponseDTO> {
    const existingCompany = await this.companyRepository.findByEmail(
      req.companyEmail,
    );

    if (existingCompany) {
      throw new EmailAlreadyExistsError("Company email already registered");
    }

    const existingUser = await this.userRepository.findByEmail(req.adminEmail);

    if (existingUser) {
      throw new EmailAlreadyExistsError("Admin email already registered");
    }

    const hashedPassword = await this.passwordService.hash(req.password);

    const company = await this.companyRepository.create({
      name: req.companyName,
      email: req.companyEmail,
      status: "active",
      subscriptionPlan: "trial",
      subscriptionStatus: "active",
    });

    const user = await this.userRepository.create({
      firstName: req.adminFirstName,
      lastName: req.adminLastName,
      email: req.adminEmail,
      password: hashedPassword,
      role: "workspace_admin",
      status: "active",
      companyId: company.id,
    });

    const tokens = this.tokenService.generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      message: "Company created successfully",
      data: {
        company: {
          id: company.id,
          name: company.name,
          email: company.email,
          status: company.status,
          subscriptionPlan: company.subscriptionPlan,
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
        tokens,
        redirectTo: "/onboarding/welcome",
      },
    };
  }
}
