import { superAdminLoginInput } from "@/validations/superAdminSchemas";
import apiClient from "./axios.config";
export interface SuperAdminPermissions {
  managePlatform: boolean;
  manageCompanies: boolean;
  manageSubscriptions: boolean;
  viewAllData: boolean;
}
export interface SuperAdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin";
  status: "active";
  permissions: SuperAdminPermissions;
}
export type SuperAdminLoginRequest = superAdminLoginInput;
export interface SuperAdminLoginResponse {
  success: boolean;
  message: string;
  data: {
    user: SuperAdminUser;
    token: string;
    expiresAt: string;
    redirectTo: string;
  };
}
export interface CompanySummary {
  id: string;
  name: string;
  email: string;
  status: string;
  subscriptionPlan: string;
  subscriptionStatus?: string;
  totalUsers: number;
  totalProjects: number;
  monthlyRevenue: number;
  lastActiveAt: string;
  createdAt: string;
}
export interface GetAllCompaniesParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  plan?: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
export interface GetAllCompaniesResponse {
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
      inactiveCompanies: number;
      suspendedCompanies: number;
      trialCompanies: number;
      totalUsers: number;
      totalProjects: number;
    };
  };
}
export interface CompanyDetails {
  id: string;
  name: string;
  email: string;
  subdomain: string;
  phone: string | null;
  website: string | null;
  address: string | null;
  status: string;
  subscriptionPlan: string;
  subscriptionStatus: string | null;
  billingCycle: string | null;
  subscriptionStartDate: string | null;
  subscriptionEndDate: string | null;
  nextBillingDate: string | null;
  monthlyRevenue: number;
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  storageUsed: number;
  storageLimit: number;
  admin: {
    id: string;
    name: string;
    email: string;
    lastLogin: string;
  } | null;
  stats: {
    totalTasks: number;
    completedTasks: number;
  };
  billing: {
    monthlyRevenue: number;
    lastPaymentDate: string | null;
    nextBillingDate: string | null;
  };
  createdAt: string;
  lastActiveAt: string;
}
export interface GetCompanyResponse {
  success: boolean;
  data: {
    company: CompanyDetails;
  };
}
export const superAdminApi = {
  login: async (
    data: SuperAdminLoginRequest,
  ): Promise<SuperAdminLoginResponse> => {
    const response = await apiClient.post("super-admin/login", data);
    return response.data;
  },
  getAllCompanies: async (
    params: GetAllCompaniesParams,
  ): Promise<GetAllCompaniesResponse> => {
    const cleanParams: any = {
      page: params.page,
      limit: params.limit,
      sortBy: params.sortBy,
      sortOrder: params.sortOrder,
    };
    if (params.search) cleanParams.search = params.search;
    if (params.status) cleanParams.status = params.status;
    if (params.plan) cleanParams.plan = params.plan;
    const response = await apiClient.get("super-admin/companies", {
      params: cleanParams,
    });
    return response.data;
  },
  getCompany: async (companyId: string): Promise<GetCompanyResponse> => {
    const response = await apiClient.get(`super-admin/companies/${companyId}`);
    return response.data;
  },
};
