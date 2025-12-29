import { inject, injectable } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import { DeleteSubscriptionPlanResponseDTO } from "../../dto/super-admin/SubscriptionPlanDTOs";
import { SubscriptionPlanNotFoundError } from "../../../shared/errors";

@injectable()
export class DeleteSubscriptionPlanUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    planId: string,
  ): Promise<{ response: DeleteSubscriptionPlanResponseDTO }> {
    if (!planId || !planId.trim()) {
      throw new SubscriptionPlanNotFoundError("Invalid subscription plan ID");
    }

    const existingPlan = await this.subscriptionPlanRepository.findById(planId);

    if (!existingPlan) {
      throw new SubscriptionPlanNotFoundError();
    }

    await this.subscriptionPlanRepository.delete(planId);

    this.logger.info("Super admin deactivated subscription plan", {
      planId,
      planName: existingPlan.name,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Subscription plan deactivated successfully",
      },
    };
  }
}
