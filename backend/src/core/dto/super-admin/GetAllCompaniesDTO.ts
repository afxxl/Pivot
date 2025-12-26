import { getAllCompaniesInput } from "../../../shared/validation/superAdminSchemas";

export type GetAllCompaniesRequestDTO = getAllCompaniesInput;
export interface CompanySummary {
  id: string;
  name: string;
  email: string;
  status: string;
  subscriptionPlan: string;
  subscriptionStatus?: string;

  totalUsers: number;
  totalWorkspaces: number;
  totalProjects: number;
  monthlyRevenue: number;

  lastActiveAt: Date | string;
  createdAt: Date | string;
}

export interface GetAllCompaniesResponseDTO {
  success: boolean;
  data: {
    companies: CompanySummary[];

    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };

    stats: {
      totalCompanies: number;
      activeCompanies: number;
      trialCompanies: number;
      totalMonthlyRevenue: number;
    };
  };
}
