import { inject, injectable } from "inversify";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import {
  SuperAdminUpdateCompanyRequestDTO,
  SuperAdminUpdateCompanyResponseDTO,
} from "../../dto/super-admin/SuperAdminUpdateCompanyDTO";
import {
  CompanyNotFoundError,
  EmailAlreadyExistsError,
  InvalidCompanyIdError,
} from "../../../shared/errors";
import { Company } from "../../entities/Company";

@injectable()
export class SuperAdminUpdateCompanyUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    companyId: string,
    body: SuperAdminUpdateCompanyRequestDTO,
  ): Promise<{ response: SuperAdminUpdateCompanyResponseDTO }> {
    if (!companyId || !companyId.trim()) {
      throw new InvalidCompanyIdError(
        "The provided company ID is invalid or does not exist",
      );
    }

    const id = companyId.trim().toLowerCase();

    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    if (company.status === "deleted") {
      throw new CompanyNotFoundError("Company has been deleted");
    }

    let updatedData: Partial<Company> = {};

    if (body.email && body.email !== company.email) {
      let existingCompany = await this.companyRepository.findByEmail(
        body?.email,
      );

      if (existingCompany && existingCompany.id !== company.id) {
        throw new EmailAlreadyExistsError("This email is already in use.");
      } else {
        updatedData.email = body.email;
      }
    }

    if (body.name) {
      updatedData.name = body.name;
    }

    if (body.phone) {
      updatedData.phone = body.phone;
    }

    if (body.website) {
      updatedData.website = body.website;
    }

    if (body.status) {
      updatedData.status = body.status;
    }

    const updatedCompany = await this.companyRepository.update(
      companyId,
      updatedData,
    );

    this.logger.info("SuperAdmin updated company details", {
      companyName: updatedCompany.name,
      email: updatedCompany.email,
      phone: updatedCompany.phone,
      website: updatedCompany.website,
      status: updatedCompany.status,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Company details updated successfully",
        data: {
          company: {
            id,
            name: updatedCompany.name,
            email: updatedCompany.email,
            phone: updatedCompany.phone,
            website: updatedCompany.website,
            status: updatedCompany.status,
            updatedAt: updatedCompany.updatedAt?.toISOString(),
          },
        },
      },
    };
  }
}
