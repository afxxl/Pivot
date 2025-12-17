import { injectable } from "inversify";
import { Company } from "../../../core/entities/Company";
import { ICompanyRepository } from "../../../core/repositories/ICompanyRepository";
import CompanyModel from "../models/CompanyModel";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class CompanyRepository implements ICompanyRepository {
  async create(
    company: Omit<Company, "id" | "createdAt" | "updatedAt">,
  ): Promise<Company> {
    const doc = new CompanyModel({
      _id: uuidv4(),
      ...company,
    });

    await doc.save();
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

  private toEntity(doc: any): Company {
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      status: doc.status,
      phone: doc.phone,
      website: doc.website,
      address: doc.address,
      subscriptionPlan: doc.subscriptionPlan,
      subscriptionStatus: doc.subscriptionStatus,
      billingCycle: doc.billingCycle,
      storageUsed: doc.storageUsed,
      storageLimit: doc.storageLimit,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
