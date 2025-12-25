import { AppError } from "../common/AppError";

export class SubdomainAlreadyExistsError extends AppError {
  constructor(message: string = "Subdomain already exists") {
    super(400, "SUBDOMAIN_EXISTS", message);
  }
}
