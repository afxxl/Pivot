export interface UpdateCompanySubscriptionRequestDTO {
  plan?: "free" | "trial" | "starter" | "professional" | "enterprise";
  billingCycle?: "monthly" | "annual";
  subscriptionStatus?: "active" | "cancelled" | "expired";
  startDate?: string;
}

export interface UpdateCompanySubscriptionResponseDTO {
  success: boolean;
  message: string;
  data: {
    subscription: {
      companyId: string;
      companyName: string;
      plan: string;
      billingCycle: string;
      status: string;
      monthlyPrice: string;
      annualPrice: string;
      subscriptionStartDate: string;
      nextBillingDate: string;
      subscriptionEndDate: string | null;
      updatedAt: string;
    };
  };
}
