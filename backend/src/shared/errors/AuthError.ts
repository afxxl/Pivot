import { AppError } from "./AppError";

export class InvalidCredentialsError extends AppError {
  constructor(message: string = "Email or password is incorrect") {
    super(401, "INVALID_CREDENTIALS", message);
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor(message: string = "Email already exists") {
    super(400, "EMAIL_EXISTS", message);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message: string = "User not found") {
    super(404, "USER_NOT_FOUND", message);
  }
}

export class CompanyNotFoundError extends AppError {
  constructor(message: string = "Company not found") {
    super(404, "Company_NOT_FOUND", message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class TokenExpiredError extends AppError {
  constructor(message: string = "Token has expired") {
    super(401, "TOKEN_EXPIRED", message);
  }
}
