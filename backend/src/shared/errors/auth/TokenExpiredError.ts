import { AppError } from "../common/AppError";

export class TokenExpiredError extends AppError {
  constructor(message: string = "Token has expired") {
    super(400, "TOKEN_EXPIRED", message);
  }
}
