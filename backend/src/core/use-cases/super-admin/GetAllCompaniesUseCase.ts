import { Types } from "../../../infra/container/types";
import {
  CompanySummary,
  GetAllCompaniesRequestDTO,
  GetAllCompaniesResponseDTO,
} from "../../dto/super-admin/GetAllCompaniesDTO";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { ILogger } from "../../services/ILogger";
import { inject, injectable } from "inversify";

@injectable()
export class GetAllCompaniesUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    req: GetAllCompaniesRequestDTO,
  ): Promise<{ response: GetAllCompaniesResponseDTO }> {
    const { page, limit, search, status, plan, sortBy, sortOrder } = req;

    const filters: any = {};

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filters.status = status;
    }

    if (plan) {
      filters.subscriptionPlan = plan;
    }

    const skip = (page - 1) * limit;

    const { companies, total } =
      await this.companyRepository.findAllWithPagination(
        filters,
        skip,
        limit,
        sortBy,
        sortOrder,
      );

    const companiesWithStats: CompanySummary[] = await Promise.all(
      companies.map(async (company) => {
        const stats = await this.companyRepository.getCompanyStats(company.id);

        return {
          id: company.id,
          name: company.name,
          email: company.email,
          status: company.status,
          subscriptionPlan: company.subscriptionPlan,
          subscriptionStatus: company.subscriptionStatus,
          totalUsers: stats.totalUser,
          totalProjects: stats.totalProjects,
          monthlyRevenue:
            company.monthlyPrice ||
            this.getMonthlyRevenue(company.subscriptionPlan),
          lastActiveAt: (
            company.lastActiveAt || company.updatedAt
          ).toISOString(),
          createdAt: company.createdAt.toISOString(),
        };
      }),
    );

    const platformStats = await this.companyRepository.getPlatformStatus();

    const totalPages = Math.ceil(total / limit);
    const pagination = {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    this.logger.info("Fetched companies for super admin", {
      page,
      limit,
      total,
      filters,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        data: {
          companies: companiesWithStats,
          pagination,
          stats: platformStats,
        },
      },
    };
  }

  private getMonthlyRevenue(plan: string): number {
    const pricing: Record<string, number> = {
      free: 0,
      trial: 0,
      starter: 99,
      professional: 499,
      enterprise: 999,
    };

    return pricing[plan] || 0;
  }
}
