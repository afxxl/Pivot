import { AppError } from "../common/AppError";

export class WorkspaceNotFoundError extends AppError {
  constructor(message: string = "Workspace not found") {
    super(404, "WORKSPACE_NOT_FOUND", message);
  }
}
