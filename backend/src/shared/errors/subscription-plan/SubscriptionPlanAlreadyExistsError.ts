import { AppError } from "../common/AppError";

export class SubscriptionPlanAlreadyExistsError extends AppError {
  constructor(
    message: string = "Subscription plan with this name already exists",
  ) {
    super(400, "SUBSCRIPTION_PLAN_ALREADY_EXISTS", message);
  }
}
