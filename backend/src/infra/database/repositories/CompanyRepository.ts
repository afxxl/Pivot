import { injectable } from "inversify";
import { Company } from "../../../core/entities/Company";
import { ICompanyRepository } from "../../../core/repositories/ICompanyRepository";
import CompanyModel from "../models/CompanyModel";
import { v4 as uuidv4 } from "uuid";
import { IUnitWork } from "../../../core/uow/IUnitWork";
import { MongooseUnitOfWork } from "../../uow/MongooseUnitOfWork";
import UserModel from "../models/UserModel";
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
    activeUsers: number;
    totalProjects: number;
    activeProjects: number;
  }> {
    //TODO: total projects should be added when project entity is created

    let totalProjects = 0;
    let activeProjects = 0;

    const [totalUser, activeUsers] = await Promise.all([
      UserModel.countDocuments({ companyId }),
      UserModel.countDocuments({ companyId, status: "active" }),
    ]);

    return {
      totalUser,
      activeUsers,
      totalProjects,
      activeProjects,
    };
  }
  async getPlatformStatus(): Promise<{
    totalCompanies: number;
    activeCompanies: number;
    inactiveCompanies: number;
    suspendedCompanies: number;
    trialCompanies: number;
    totalUsers: number;
    totalProjects: number;
  }> {
    const [
      totalCompanies,
      activeCompanies,
      inactiveCompanies,
      suspendedCompanies,
      trialCompanies,
      totalUsers,
    ] = await Promise.all([
      CompanyModel.countDocuments({}),
      CompanyModel.countDocuments({ status: "active" }),
      CompanyModel.countDocuments({ status: "inactive" }),
      CompanyModel.countDocuments({ status: "suspended" }),
      CompanyModel.countDocuments({ status: "trial" }),
      UserModel.countDocuments({}),
    ]);

    //TODO: Add totalProjects when project entity is created
    const totalProjects = 0;

    return {
      totalCompanies,
      activeCompanies,
      inactiveCompanies,
      suspendedCompanies,
      trialCompanies,
      totalUsers,
      totalProjects,
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
