import { AppError } from "../common/AppError";

export class InvalidCredentialsError extends AppError {
  constructor(message: string = "Email or password is incorrect") {
    super(401, "INVALID_CREDENTIALS", message);
  }
}
