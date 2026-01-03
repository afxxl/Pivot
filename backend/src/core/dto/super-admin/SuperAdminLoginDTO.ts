import { superAdminLoginInput } from "../../../shared/validation/superAdminSchemas";

export type SuperAdminLoginRequestDTO = superAdminLoginInput;

export interface SuperAdminLoginResponseDTO {
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
      permissions: {
        managePlatform: boolean;
        manageCompanies: boolean;
        manageSubscriptions: boolean;
        viewAllData: boolean;
      };
    };
    token: string;
    expiresAt: string;
  };
}
