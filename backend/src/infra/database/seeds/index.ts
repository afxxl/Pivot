import { seedSubscriptionPlans } from "./subscriptionPlanSeeds";

export const runSeeds = async () => {
  await seedSubscriptionPlans();
};
