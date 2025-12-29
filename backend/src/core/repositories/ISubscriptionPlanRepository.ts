import { SubscriptionPlan } from "../entities/SubscriptionPlan";

export interface ISubscriptionPlanRepository {
  create(
    planData: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">,
  ): Promise<SubscriptionPlan>;

  findAll(): Promise<SubscriptionPlan[]>;

  findById(planId: string): Promise<SubscriptionPlan | null>;

  findByName(name: string): Promise<SubscriptionPlan | null>;

  update(
    planId: string,
    data: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan>;

  delete(planId: string): Promise<boolean>;

  findActive(): Promise<SubscriptionPlan[]>;
}
