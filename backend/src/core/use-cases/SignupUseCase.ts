import { SignupRequestDTO, SignupResponseDTO } from "../dto/SignupDTO";
import { ICompanyRepository } from "../repositories/ICompanyRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class SignupUseCase {
  constructor(
    private userRepository: IUserRepository,
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(req: SignupRequestDTO): Promise<SignupResponseDTO> {
    const existingCompany = await this.companyRepository.findByEmail(
      req.companyEmail,
    );

    if (existingCompany) {
      throw new Error("EMAIL_EXISTS: Company email already registered");
    }

    const existingUser = await this.companyRepository.findByEmail(
      req.adminEmail,
    );

    if (existingUser) {
      throw new Error("EMAIL_EXISTS: Admin email already registered");
    }

    const hashedPassword = await bcrypt.hash(req.password, 10);

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

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "24h" },
    );

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
        token,
        redirectTo: "/onboarding/welcome",
      },
    };
  }
}
