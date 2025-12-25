import { loginInput } from "../../../shared/validation/authSchemas";

export interface UserPermissions {
  manageBilling: boolean;
  manageWorkspaceAdmins: boolean;
  viewAllWorkspaces: boolean;
  manageCompanySettings: boolean;
  viewAuditLogs: boolean;
}

export type LoginRequestDTO = loginInput;

export interface LoginResponseDTO {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      status: string;
      company: {
        id: string;
        name: string;
      };
      permissions: UserPermissions;
    };
    token: string;
    expiresAt: string;
    redirectTo: string;
  };
}
