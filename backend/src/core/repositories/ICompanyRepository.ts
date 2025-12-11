import { Company } from "../entities/Company";

export interface ICompanyRepository {
  create(
    company: Omit<Company, "id" | "createdAt" | "updatedAt">,
  ): Promise<Company>;
  findByEmail(email: string): Promise<Company | null>;
  findById(companyId: string): Promise<Company | null>;
}
