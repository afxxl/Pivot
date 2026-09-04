import { injectable, inject } from "inversify";

import { Types } from "../../../infra/container/types";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { ILogger } from "../../services/ILogger";
import { GetCompanyProfileResponseDTO } from "../../dto/admin/GetCompanyProfileDTO";
import {
  CompanyNotFoundError,
  SubscriptionPlanNotFoundError,
} from "../../../shared/errors";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class GetCompanyProfileUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionRepository: ISubscriptionPlanRepository,
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(
    companyId: string,
  ): Promise<{ response: GetCompanyProfileResponseDTO }> {
    const company = await this.companyRepository.findById(companyId);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    const plan = await this.subscriptionRepository.findByName(
      company.subscriptionPlan,
    );

    if (!plan) {
      throw new SubscriptionPlanNotFoundError(
        `Subscription plan '${company.subscriptionPlan}' was not found in the system.`,
      );
    }

    const usedUsers = await this.userRepository.countActiveUser(companyId, 365);

    return {
      response: {
        success: true,
        data: {
          company: {
            id: company.id,
            name: company.name,
            email: company.email,
            phone: company.phone || null,
            website: company.website || null,
            logo: company.logo || null,
            status: company.status,
            plan: company.subscriptionPlan,
            planDetails: {
              name: plan?.name ?? company.subscriptionPlan,
              maxUsers: plan.features.maxUsers,
              maxProjects: plan.features.maxProjects,
              usedUsers,
              usedProjects: 0,
            },
            createdAt: company.createdAt.toISOString(),
          },
        },
      },
    };
  }
}
