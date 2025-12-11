import { IUserRepository } from "../../../core/repositories/IUserRepository";
import UserModel from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../../core/entities/User";

export class UserRepository implements IUserRepository {
  async create(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    const doc = new UserModel({
      _id: uuidv4(),
      ...userData,
    });
    await doc.save();
    return this.toEntity(doc);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? this.toEntity(user) : null;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    return user ? this.toEntity(user) : null;
  }

  private toEntity(doc: any): User {
    return {
      id: doc._id,
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      status: doc.status,
      companyId: doc.companyId,
      phone: doc.phone,
      profile: doc.profile,
      preferences: doc.preferences,
      lastLogin: doc.lastLogin,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
