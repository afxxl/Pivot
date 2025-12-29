import { Types } from "../../../infra/container/types";
import { inject, injectable } from "inversify";
import {
  CompanyNotFoundError,
  InvalidCompanyIdError,
} from "../../../shared/errors";
import { GetCompanyResponseDTO } from "../../dto/super-admin/GetCompanyDTO";
import { ICompanyRepository } from "../../repositories/ICompanyRepository";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IWorkspaceMemberRepository } from "../../repositories/IWorkspaceMemberRepository";
import { IWorkspaceRepository } from "../../repositories/IWorkspaceRepository";
import { ILogger } from "../../services/ILogger";

@injectable()
export class GetCompanyUseCase {
  constructor(
    @inject(Types.Logger)
    private logger: ILogger,
    @inject(Types.CompanyRepository)
    private companyRepository: ICompanyRepository,
    @inject(Types.UserRepository)
    private userRepository: IUserRepository,
    @inject(Types.WorkspaceRepository)
    private workspaceRepository: IWorkspaceRepository,
    @inject(Types.WorkspaceMemberRepository)
    private workspaceMemberRepository: IWorkspaceMemberRepository,
  ) {}

  async execute(
    companyId: string,
  ): Promise<{ response: GetCompanyResponseDTO }> {
    if (!companyId || !companyId.trim()) {
      throw new InvalidCompanyIdError(
        "The provided company ID is invalid or does not exist",
      );
    }

    const id = companyId.trim().toLowerCase();

    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidV4Regex.test(id)) {
      throw new InvalidCompanyIdError("Invalid company ID format");
    }

    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new CompanyNotFoundError("Company not found");
    }

    if (company.status === "deleted") {
      throw new CompanyNotFoundError("Company has been deleted");
    }

    const companyStats = await this.companyRepository.getCompanyStats(id);

    const companyAdmin = await this.userRepository.findCompanyAdmin(id);

    let companyAdminData = null;

    if (companyAdmin) {
      companyAdminData = {
        id: companyAdmin.id,
        name: `${companyAdmin.firstName} ${companyAdmin.lastName}`,
        email: companyAdmin.email,
        lastLogin: companyAdmin.lastLogin
          ? companyAdmin.lastLogin.toISOString()
          : companyAdmin.updatedAt
            ? companyAdmin.updatedAt.toISOString()
            : new Date().toISOString(),
      };
    } else {
      this.logger.warn("Company has no admin", {
        companyId: id,
        timestamp: new Date().toISOString(),
      });
    }

    let workspaces = await this.workspaceRepository.findByCompanyId(id);

    workspaces = workspaces.filter((ws) => ws.status !== "deleted");

    const workspaceStats = await Promise.all(
      workspaces.map(async (ws) => {
        const memberCount =
          await this.workspaceMemberRepository.countByWorkspaceId(ws.id);

        return {
          id: ws.id,
          name: ws.name,
          memberCount,
          projectCount: 0, // TODO: need to add when project implemented
        };
      }),
    );

    const activityStats = {
      last7Days: {
        activeUsers: await this.userRepository.countActiveUser(id, 7),
        storiesCreated: 0,
        storiesCompleted: 0,
        hoursLogged: 0,
      },
      last30Days: {
        activeUsers: await this.userRepository.countActiveUser(id, 30),
        storiesCreated: 0,
        storiesCompleted: 0,
        hoursLogged: 0,
      },
    };

    const billingHistory: any[] = [];

    const pricing: Record<string, number> = {
      free: 0,
      trial: 0,
      starter: 99,
      professional: 499,
      enterprise: 999,
    };

    const monthlyRevenue =
      company.monthlyPrice || pricing[company.subscriptionPlan] || 0;

    this.logger.info("Super admin viewed company details", {
      companyId: id,
      companyName: company.name,
      timestamp: new Date().toISOString(),
    });

    return {
      response: {
        success: true,
        data: {
          company: {
            id: company.id,
            name: company.name,
            email: company.email,
            subdomain: company.subdomain,
            phone: company.phone || null,
            website: company.website || null,
            address: company.address || null,
            status: company.status,
            subscriptionPlan: company.subscriptionPlan,
            subscriptionStatus: company.subscriptionStatus || null,
            billingCycle: company.billingCycle || null,
            subscriptionStartDate:
              company.subscriptionStartDate?.toISOString() || null,
            subscriptionEndDate:
              company.subscriptionEndDate?.toISOString() || null,
            nextBillingDate: company.nextBillingDate?.toISOString() || null,
            monthlyRevenue,
            totalUsers: companyStats.totalUser,
            totalWorkspaces: companyStats.totalWorkspaces,
            totalProjects: companyStats.totalProjects,
            storageUsed: company.storageUsed || 0,
            storageLimit: company.storageLimit || 5368709120,
            companyAdmin: companyAdminData,
            workspaces: workspaceStats,
            activityStats,
            billingHistory,
            createdAt: company.createdAt.toISOString(),
            updatedAt: company.updatedAt.toISOString(),
          },
        },
      },
    };
  }
}
