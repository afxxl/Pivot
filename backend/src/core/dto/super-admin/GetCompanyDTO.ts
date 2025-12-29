export interface GetCompanyResponseDTO {
  success: boolean;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      subdomain: string;
      phone?: string | null;
      website?: string | null;
      address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      } | null;
      status: string;
      subscriptionPlan: string;
      subscriptionStatus?: string | null;
      billingCycle?: string | null;
      subscriptionStartDate?: string | null;
      subscriptionEndDate?: string | null;
      nextBillingDate?: string | null;
      monthlyRevenue: number;
      totalUsers: number;
      totalWorkspaces: number;
      totalProjects: number;
      storageUsed: number;
      storageLimit: number;
      companyAdmin: {
        id: string;
        name: string;
        email: string;
        lastLogin: string;
      } | null;
      workspaces: Array<{
        id: string;
        name: string;
        memberCount: number;
        projectCount: number;
      }>;
      activityStats: {
        last7Days: {
          activeUsers: number;
          storiesCreated: number;
          storiesCompleted: number;
          hoursLogged: number;
        };
        last30Days: {
          activeUsers: number;
          storiesCreated: number;
          storiesCompleted: number;
          hoursLogged: number;
        };
      };
      billingHistory: any[];
      createdAt: string;
      updatedAt: string;
    };
  };
}
