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

export class UserInvitedError extends AppError {
  constructor(message: string = "User already invited") {
    super(403, "USER_INVITED", message);
  }
}

export class UserInactiveError extends AppError {
  constructor(message: string = "User is inactive") {
    super(403, "USER_INACTIVE", message);
  }
}

export class SubdomainAlreadyExistsError extends AppError {
  constructor(message: string = "Subdomain already exists") {
    super(400, "SUBDOMAIN_EXISTS", message);
  }
}

export class SubdomainNotFoundError extends AppError {
  constructor(message: string = "Subdomain not found") {
    super(404, "SUBDOMAIN_NOT_FOUND", message);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message: string = "User not found") {
    super(404, "USER_NOT_FOUND", message);
  }
}

export class CompanyNotFoundError extends AppError {
  constructor(message: string = "Company not found") {
    super(404, "COMPANY_NOT_FOUND", message);
  }
}

export class CompanyInactiveError extends AppError {
  constructor(message: string = "This company is inactive") {
    super(403, "COMPANY_INACTIVE", message);
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

export class CompanySuspendedError extends AppError {
  constructor(
    message: string = "The company account is currently suspended. Please contact support for assistance.",
  ) {
    super(403, "COMPANY_SUSPENDED", message);
  }
}
export class WorkspaceNotFoundError extends AppError {
  constructor(message: string = "Workspace not found") {
    super(404, "WORKSPACE_NOT_FOUND", message);
  }
}
export class InvalidTokenError extends AppError {
  constructor(message: string = "Invalid Token ") {
    super(400, "INVALID_TOKEN", message);
  }
}

export class TokenAlreadyUsedError extends AppError {
  constructor(message: string = "Token has already been used") {
    super(400, "TOKEN_ALREADY_USED", message);
  }
}

export class PasswordReuseError extends AppError {
  constructor(message: string = "Password has already been used") {
    super(400, "PASSWORD_REUSE", message);
  }
}
