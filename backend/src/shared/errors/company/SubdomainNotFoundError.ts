import { AppError } from "../common/AppError";

export class SubdomainNotFoundError extends AppError {
  constructor(message: string = "Subdomain not found") {
    super(404, "SUBDOMAIN_NOT_FOUND", message);
  }
}
