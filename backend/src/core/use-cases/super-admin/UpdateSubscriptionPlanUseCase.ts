import { inject, injectable } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import {
  UpdateSubscriptionPlanRequestDTO,
  UpdateSubscriptionPlanResponseDTO,
} from "../../dto/super-admin/SubscriptionPlanDTOs";
import {
  SubscriptionPlanNotFoundError,
  SubscriptionPlanAlreadyExistsError,
} from "../../../shared/errors";

@injectable()
export class UpdateSubscriptionPlanUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    planId: string,
    data: UpdateSubscriptionPlanRequestDTO,
  ): Promise<{ response: UpdateSubscriptionPlanResponseDTO }> {
    if (!planId || !planId.trim()) {
      throw new SubscriptionPlanNotFoundError("Invalid subscription plan ID");
    }

    const existingPlan = await this.subscriptionPlanRepository.findById(planId);

    if (!existingPlan) {
      throw new SubscriptionPlanNotFoundError();
    }

    if (data.name && data.name !== existingPlan.name) {
      const planWithSameName = await this.subscriptionPlanRepository.findByName(
        data.name,
      );

      if (planWithSameName) {
        throw new SubscriptionPlanAlreadyExistsError(
          `Subscription plan with name "${data.name}" already exists`,
        );
      }
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.monthlyPrice !== undefined)
      updateData.monthlyPrice = data.monthlyPrice;
    if (data.annualPrice !== undefined)
      updateData.annualPrice = data.annualPrice;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    if (data.features) {
      updateData.features = {
        ...existingPlan.features,
        ...data.features,
      };
    }
    const updatedPlan = await this.subscriptionPlanRepository.update(
      planId,
      updateData,
    );

    this.logger.info("Super admin updated subscription plan", {
      planId,
      planName: updatedPlan.name,
      updatedFields: Object.keys(data),
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Subscription plan updated successfully",
        data: {
          plan: {
            id: updatedPlan.id,
            name: updatedPlan.name,
            monthlyPrice: updatedPlan.monthlyPrice,
            updatedAt: updatedPlan.updatedAt.toISOString(),
          },
        },
      },
    };
  }
}
