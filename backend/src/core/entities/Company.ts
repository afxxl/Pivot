export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  status: "active" | "inactive" | "trial";
  subscriptionPlan:
    | "free"
    | "trial"
    | "starter"
    | "professional"
    | "enterprise";
  subscriptionStatus?: "active" | "cancelled" | "expired";
  billingCycle?: "monthly" | "annual";
  storageUsed?: number;
  storageLimit?: number;
  createdAt: Date;
  updatedAt: Date;
}
