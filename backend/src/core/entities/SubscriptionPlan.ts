export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  features: {
    maxUsers: number;
    maxWorkspaces: number;
    maxProjects: number;
    maxStorageGB: number;
    supportLevel: "community" | "email" | "priority" | "dedicated";
    customFields?: boolean;
    integrations?: string[] | "all";
    advancedReports?: boolean;
    apiAccess?: boolean;
    sso?: boolean;
    customDomain?: boolean;
    auditLogs?: boolean;
    trialDays?: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
