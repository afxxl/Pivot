import { inject, injectable } from "inversify";
import { Types } from "../../../infra/container/types";
import { ILogger } from "../../services/ILogger";
import { ISubscriptionPlanRepository } from "../../repositories/ISubscriptionPlanRepository";
import {
  CreateSubscriptionPlanRequestDTO,
  CreateSubscriptionPlanResponseDTO,
} from "../../dto/super-admin/SubscriptionPlanDTOs";
import { SubscriptionPlanAlreadyExistsError } from "../../../shared/errors";

@injectable()
export class CreateSubscriptionPlanUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.SubscriptionPlanRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    data: CreateSubscriptionPlanRequestDTO,
  ): Promise<{ response: CreateSubscriptionPlanResponseDTO }> {
    const existingPlan = await this.subscriptionPlanRepository.findByName(
      data.name,
    );

    if (existingPlan) {
      throw new SubscriptionPlanAlreadyExistsError(
        `Subscription plan with name "${data.name}" already exists`,
      );
    }

    const plan = await this.subscriptionPlanRepository.create(data);

    this.logger.info("Super admin created subscription plan", {
      planId: plan.id,
      planName: plan.name,
      monthlyPrice: plan.monthlyPrice,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        message: "Subscription plan created successfully",
        data: {
          plan: {
            id: plan.id,
            name: plan.name,
            monthlyPrice: plan.monthlyPrice,
            annualPrice: plan.annualPrice,
            createdAt: plan.createdAt.toISOString(),
          },
        },
      },
    };
  }
}
