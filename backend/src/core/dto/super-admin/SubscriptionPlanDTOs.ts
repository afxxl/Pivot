export interface GetAllSubscriptionPlansResponseDTO {
  success: boolean;
  data: {
    plans: Array<{
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
        supportLevel: string;
        customFields?: boolean;
        integrations?: string[] | string;
        advancedReports?: boolean;
        apiAccess?: boolean;
        sso?: boolean;
        customDomain?: boolean;
        auditLogs?: boolean;
        trialDays?: number;
      };
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export interface GetSubscriptionPlanByIdResponseDTO {
  success: boolean;
  data: {
    plan: {
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
        supportLevel: string;
        customFields?: boolean;
        integrations?: string[] | string;
        advancedReports?: boolean;
        apiAccess?: boolean;
        sso?: boolean;
        customDomain?: boolean;
        auditLogs?: boolean;
        trialDays?: number;
      };
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface CreateSubscriptionPlanRequestDTO {
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
}

export interface CreateSubscriptionPlanResponseDTO {
  success: boolean;
  message: string;
  data: {
    plan: {
      id: string;
      name: string;
      monthlyPrice: string;
      annualPrice: string;
      createdAt: string;
    };
  };
}

export interface UpdateSubscriptionPlanRequestDTO {
  name?: string;
  description?: string;
  monthlyPrice?: string;
  annualPrice?: string;
  features?: {
    maxUsers?: number;
    maxWorkspaces?: number;
    maxProjects?: number;
    maxStorageGB?: number;
    supportLevel?: "community" | "email" | "priority" | "dedicated";
    customFields?: boolean;
    integrations?: string[] | "all";
    advancedReports?: boolean;
    apiAccess?: boolean;
    sso?: boolean;
    customDomain?: boolean;
    auditLogs?: boolean;
    trialDays?: number;
  };
  isActive?: boolean;
}
export interface UpdateSubscriptionPlanResponseDTO {
  success: boolean;
  message: string;
  data: {
    plan: {
      id: string;
      name: string;
      monthlyPrice: string;
      updatedAt: string;
    };
  };
}

export interface DeleteSubscriptionPlanResponseDTO {
  success: boolean;
  message: string;
}
