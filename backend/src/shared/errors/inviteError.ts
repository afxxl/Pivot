import { AppError } from "./AppError";

export class InviteNotFoundError extends AppError {
  constructor(message: string = "Invite not found") {
    super(404, "INVITE_NOT_FOUND", message);
  }
}

export class InviteAlreadyExists extends AppError {
  constructor(message: string = "Invite already exists") {
    super(400, "INVITE_EXISTS", message);
  }
}

export class InviteAlreadySentError extends AppError {
  constructor(message: string = "Invite already send") {
    super(400, "INVITE_ALREADY_SEND", message);
  }
}

export class CannotInviteSelfError extends AppError {
  constructor(message: string = "You cannot invite yourself") {
    super(400, "CANNOT_INVITE_SELF", message);
  }
}

export class TokenNotFoundError extends AppError {
  constructor(message: string = "Token not found") {
    super(404, "TOKEN_NOT_FOUND", message);
  }
}

export class InvalidTokenFormatError extends AppError {
  constructor(message: string = "Invalid token format") {
    super(400, "INVALID_TOKEN_FORMAT", message);
  }
}

export class InvalidInviteTokenError extends AppError {
  constructor(message: string = "Invalid invite token") {
    super(404, "INVALID_INVITE_TOKEN", message);
  }
}

export class InvitationAlreadyAcceptedError extends AppError {
  constructor(message: string = "Invitation already accepted") {
    super(400, "INVITATION_ALREADY_ACCEPTED", message);
  }
}

export class InviteCancelledError extends AppError {
  constructor(message: string = "Invite has been cancelled") {
    super(410, "INVITE_CANCELLED", message);
  }
}

export class InviteExpiredError extends AppError {
  constructor(message: string = "invite has expired") {
    super(410, "INVITE_EXPIRED", message);
  }
}
export class InviterNotFoundError extends AppError {
  constructor(message: string = "Inviter not found") {
    super(404, "INVITER_NOT_FOUND", message);
  }
}

export class InvalidInviteStatusError extends AppError {
  constructor(message: string = "Invalid Invite Status") {
    super(400, "INVALID_INVITE_STATUS", message);
  }
}
