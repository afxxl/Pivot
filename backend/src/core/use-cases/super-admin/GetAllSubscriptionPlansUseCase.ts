import { inject, injectable } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import { GetAllSubscriptionPlansResponseDTO } from "../../dto/super-admin/SubscriptionPlanDTOs";

@injectable()
export class GetAllSubscriptionPlansUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(): Promise<{ response: GetAllSubscriptionPlansResponseDTO }> {
    const plans = await this.subscriptionPlanRepository.findAll();

    const plansFormatted = plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      monthlyPrice: plan.monthlyPrice,
      annualPrice: plan.annualPrice,
      features: plan.features,
      isActive: plan.isActive,
      createdAt: plan.createdAt.toISOString(),
      updatedAt: plan.updatedAt.toISOString(),
    }));

    this.logger.info("Super admin viewed subscription plans", {
      totalPlans: plans.length,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        data: {
          plans: plansFormatted,
        },
      },
    };
  }
}
