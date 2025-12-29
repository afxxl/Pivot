import { AppError } from "../common/AppError";

export class SubscriptionPlanNotFoundError extends AppError {
  constructor(message: string = "Subscription plan not found") {
    super(404, "SUBSCRIPTION_PLAN_NOT_FOUND", message);
  }
}
