import { Company } from "../entities/Company";
import { IUnitWork } from "../uow/IUnitWork";

export interface ICompanyRepository {
  create(
    company: Omit<Company, "id" | "createdAt" | "updatedAt">,
    uow?: IUnitWork,
  ): Promise<Company>;
  findByEmail(email: string): Promise<Company | null>;
  findById(companyId: string): Promise<Company | null>;
  findBySubDomain(subdomain: string): Promise<Company | null>;
  findAllWithPagination(
    filters: any,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
  ): Promise<{ companies: Company[]; total: number }>;

  getCompanyStats(companyId: string): Promise<{
    totalUser: number;
    totalWorkspaces: number;
    totalProjects: number;
  }>;

  getPlatformStatus(): Promise<{
    totalCompanies: number;
    activeCompanies: number;
    trialCompanies: number;
    totalMonthlyRevenue: number;
  }>;
}
