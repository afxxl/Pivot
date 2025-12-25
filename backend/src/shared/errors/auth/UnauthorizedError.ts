import { AppError } from "../common/AppError";

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(401, "UNAUTHORIZED", message);
  }
}
