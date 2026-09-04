import { injectable, inject } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import {
  UpdateCompanyProfileRequestDTO,
  UpdateCompanyProfileResponseDTO,
} from "../../dto/admin/UpdateCompanyProfileDTO";
import {
  CompanyNotFoundError,
  EmailAlreadyExistsError,
  InvalidCompanyIdError,
} from "../../../shared/errors";
import { Company } from "../../entities/Company";

@injectable()
export class UpdateCompanyProfileUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    companyId: string,
    body: UpdateCompanyProfileRequestDTO,
  ): Promise<{ response: UpdateCompanyProfileResponseDTO }> {
    if (!companyId || !companyId.trim()) {
      throw new InvalidCompanyIdError(
        "The provided company ID is invalid or does not exist",
      );
    }

    const id = companyId.trim().toLowerCase();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidV4Regex.test(id)) {
      throw new InvalidCompanyIdError("Invalid company ID format");
    }
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    if (company.status === "deleted") {
      throw new CompanyNotFoundError("Company had been deleted");
    }

    const updateData: Partial<Company> = {};

    if (body.email && body.email !== company.email) {
      let existingCompany = await this.companyRepository.findByEmail(
        body?.email,
      );

      if (existingCompany && existingCompany.id !== company.id) {
        throw new EmailAlreadyExistsError("This email is already in use.");
      } else {
        updateData.email = body.email;
      }
    }

    if (body.name) {
      updateData.name = body.name;
    }

    if (body.phone) {
      updateData.phone = body.phone;
    }

    if (body.website) {
      updateData.website = body.website;
    }

    if (body.logo) {
      updateData.logo = body.logo;
    }

    const updatedCompany = await this.companyRepository.update(
      companyId,
      updateData,
    );

    this.logger.info("Admin updated company details", {
      companyName: updatedCompany.name,
      email: updatedCompany.email,
      phone: updatedCompany.phone,
      website: updatedCompany.website,
      logo: updatedCompany.logo,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Company profile updated successfully",
        data: {
          company: {
            id: updatedCompany.id,
            name: updatedCompany.name,
            email: updatedCompany.email,
            phone: updatedCompany.phone,
            website: updatedCompany.website,
            logo: updatedCompany.logo,
            updatedAt: updatedCompany.updatedAt.toISOString(),
          },
        },
      },
    };
  }
}
