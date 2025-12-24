import { PasswordReset } from "../entities/PasswordReset";

export interface IPasswordResetRepository {
  create(
    passwordReset: Omit<PasswordReset, "id" | "createdAt" | "updatedAt">,
  ): Promise<PasswordReset>;

  update(
    id: string,
    passwordReset: Partial<PasswordReset>,
  ): Promise<PasswordReset>;

  findByToken(token: string): Promise<PasswordReset | null>;

  findByUserId(userId: string): Promise<PasswordReset | null>;

  markAsUsed(id: string): Promise<void>;

  deleteExpired(): Promise<void>;

  delete(id: string): Promise<void>;

  deleteAllByUserId(userId: string): Promise<void>;
}
