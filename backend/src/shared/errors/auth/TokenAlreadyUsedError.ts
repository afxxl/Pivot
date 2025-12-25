import { AppError } from "../common/AppError";

export class TokenAlreadyUsedError extends AppError {
  constructor(message: string = "This reset link has already been used") {
    super(400, "TOKEN_ALREADY_USED", message); // ✅ Changed from 401 to 400
  }
}
