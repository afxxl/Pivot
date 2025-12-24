export interface PasswordReset {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
