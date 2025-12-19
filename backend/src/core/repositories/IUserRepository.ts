import { User } from "../entities/User";
import { IUnitWork } from "../uow/IUnitWork";

export interface IUserRepository {
  create(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
    uow?: IUnitWork,
  ): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndCompanyId(
    email: string,
    companyId: string,
  ): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  update(userId: string, data: Partial<User>): Promise<User>;
}
