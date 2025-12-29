import { injectable } from "inversify";
import { Company } from "../../../core/entities/Company";
import { ICompanyRepository } from "../../../core/repositories/ICompanyRepository";
import CompanyModel from "../models/CompanyModel";
import { v4 as uuidv4 } from "uuid";
import { IUnitWork } from "../../../core/uow/IUnitWork";
import { MongooseUnitOfWork } from "../../uow/MongooseUnitOfWork";
import UserModel from "../models/UserModel";
import WorkspaceModel from "../models/WorkspaceModel";
import { CompanyNotFoundError } from "../../../shared/errors/company/CompanyNotFoundError";

@injectable()
export class CompanyRepository implements ICompanyRepository {
  async create(
    company: Omit<Company, "id" | "createdAt" | "updatedAt">,
    uow?: IUnitWork,
  ): Promise<Company> {
    const session =
      uow instanceof MongooseUnitOfWork ? uow.getSession() : undefined;

    const doc = new CompanyModel({
      _id: uuidv4(),
      ...company,
    });

    await doc.save({ session });
    return this.toEntity(doc);
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await CompanyModel.findOne({ email });

    return company ? this.toEntity(company) : null;
  }

  async findById(companyId: string): Promise<Company | null> {
    const company = await CompanyModel.findById(companyId);

    return company ? this.toEntity(company) : null;
  }

  async findBySubDomain(subdomain: string): Promise<Company | null> {
    const company = await CompanyModel.findOne({ subdomain });
    return company ? this.toEntity(company) : null;
  }

  async findAllWithPagination(
    filters: any,
    skip: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
  ): Promise<{ companies: Company[]; total: number }> {
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    let [doc, total] = await Promise.all([
      CompanyModel.find(filters)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(limit),
      CompanyModel.countDocuments(filters),
    ]);

    return {
      companies: doc.map((x) => this.toEntity(x)),
      total,
    };
  }

  async getCompanyStats(companyId: string): Promise<{
    totalUser: number;
    totalWorkspaces: number;
    totalProjects: number;
  }> {
    //TODO: total projects should be added

    let totalProjects = 0;

    const [totalUser, totalWorkspaces] = await Promise.all([
      UserModel.countDocuments({ companyId }),
      WorkspaceModel.countDocuments({ companyId }),
    ]);

    return {
      totalUser,
      totalWorkspaces,
      totalProjects,
    };
  }
  async getPlatformStatus(): Promise<{
    totalCompanies: number;
    activeCompanies: number;
    trialCompanies: number;
    totalMonthlyRevenue: number;
  }> {
    const [totalCompanies, activeCompanies, trialCompanies] = await Promise.all(
      [
        CompanyModel.countDocuments({}),
        CompanyModel.countDocuments({ status: "active" }),
        CompanyModel.countDocuments({ status: "trial" }),
      ],
    );

    const activeCompaniesData = await CompanyModel.find({ status: "active" });

    const pricing: Record<string, number> = {
      free: 0,
      trial: 0,
      starter: 99,
      professional: 499,
      enterprise: 999,
    };

    const totalMonthlyRevenue = activeCompaniesData.reduce((acc, company) => {
      return acc + (pricing[company.subscriptionPlan] || 0);
    }, 0);

    return {
      totalCompanies,
      activeCompanies,
      trialCompanies,
      totalMonthlyRevenue,
    };
  }

  async update(companyId: string, data: Partial<Company>): Promise<Company> {
    const company = await CompanyModel.findByIdAndUpdate(
      companyId,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!company) {
      throw new CompanyNotFoundError();
    }

    return this.toEntity(company);
  }

  private toEntity(doc: any): Company {
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      subdomain: doc.subdomain,
      status: doc.status,
      phone: doc.phone,
      website: doc.website,
      address: doc.address,
      subscriptionPlan: doc.subscriptionPlan,
      subscriptionStatus: doc.subscriptionStatus,
      billingCycle: doc.billingCycle,
      subscriptionStartDate: doc.subscriptionStartDate,
      subscriptionEndDate: doc.subscriptionEndDate,
      nextBillingDate: doc.nextBillingDate,
      monthlyPrice: doc.monthlyPrice,
      storageUsed: doc.storageUsed,
      storageLimit: doc.storageLimit,
      lastActiveAt: doc.lastActiveAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
