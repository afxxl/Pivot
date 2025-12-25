import { PasswordReset } from "../../../core/entities/PasswordReset";
import { IPasswordResetRepository } from "../../../core/repositories/IPasswordResetRepository";
import PasswordResetModel from "../models/PasswordResetModel";
import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { MongooseUnitOfWork } from "../../uow/MongooseUnitOfWork";
import { IUnitWork } from "../../../core/uow/IUnitWork";

@injectable()
export class PasswordResetRepository implements IPasswordResetRepository {
  async create(
    passwordReset: Omit<PasswordReset, "id" | "createdAt" | "updatedAt">,
  ): Promise<PasswordReset> {
    const doc = new PasswordResetModel({
      _id: uuidv4(),
      ...passwordReset,
    });

    await doc.save();
    return this.toEntity(doc);
  }

  async update(
    id: string,
    passwordReset: Partial<PasswordReset>,
    uow?: IUnitWork,
  ): Promise<PasswordReset> {
    let session =
      uow instanceof MongooseUnitOfWork ? uow.getSession() : undefined;

    let doc = await PasswordResetModel.findByIdAndUpdate(
      id,
      { $set: passwordReset },
      { new: true, runValidators: true, session },
    );

    if (!doc) {
      throw new Error("PasswordReset not found");
    }
    return this.toEntity(doc);
  }

  async findByToken(token: string): Promise<PasswordReset | null> {
    const doc = await PasswordResetModel.findOne({ token });
    return doc ? this.toEntity(doc) : null;
  }

  async findByUserId(userId: string): Promise<PasswordReset | null> {
    const doc = await PasswordResetModel.findOne({ userId });
    return doc ? this.toEntity(doc) : null;
  }

  async markAsUsed(id: string): Promise<void> {
    await PasswordResetModel.updateOne({ _id: id }, { isUsed: true });
  }

  async deleteExpired(): Promise<void> {
    await PasswordResetModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }

  async delete(id: string): Promise<void> {
    await PasswordResetModel.findByIdAndDelete(id);
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await PasswordResetModel.deleteMany({ userId });
  }

  private toEntity(doc: any): PasswordReset {
    return {
      id: doc._id,
      userId: doc.userId,
      token: doc.token,
      expiresAt: doc.expiresAt,
      isUsed: doc.isUsed,
      createdAt: doc.createdAt,
      usedAt: doc.usedAt,
      updatedAt: doc.updatedAt,
    };
  }
}
