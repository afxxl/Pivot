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

// Invite Errors

export class InviteNotFoundError extends AppError {
  constructor(message: string = "Invite not found") {
    super(404, "INVITE_NOT_FOUND", message);
  }
}
