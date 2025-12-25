import { AppError } from "../common/AppError";

export class PasswordReuseError extends AppError {
  constructor(message: string = "Cannot reuse current password") {
    super(400, "PASSWORD_REUSED", message);
  }
}
