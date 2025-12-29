import { inject, injectable } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import { GetSubscriptionPlanByIdResponseDTO } from "../../dto/super-admin/SubscriptionPlanDTOs";
import { SubscriptionPlanNotFoundError } from "../../../shared/errors";

@injectable()
export class GetSubscriptionPlanByIdUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    planId: string,
  ): Promise<{ response: GetSubscriptionPlanByIdResponseDTO }> {
    if (!planId || !planId.trim()) {
      throw new SubscriptionPlanNotFoundError("Invalid subscription plan ID");
    }

    const plan = await this.subscriptionPlanRepository.findById(planId);

    if (!plan) {
      throw new SubscriptionPlanNotFoundError();
    }

    this.logger.info("Super admin viewed subscription plan details", {
      planId,
      planName: plan.name,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        data: {
          plan: {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            monthlyPrice: plan.monthlyPrice,
            annualPrice: plan.annualPrice,
            features: plan.features,
            isActive: plan.isActive,
            createdAt: plan.createdAt.toISOString(),
            updatedAt: plan.updatedAt.toISOString(),
          },
        },
      },
    };
  }
}
