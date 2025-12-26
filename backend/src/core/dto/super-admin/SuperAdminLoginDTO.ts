import { superAdminLoginInput } from "../../../shared/validation/superAdminSchemas";

export type SuperAdminLoginRequestDTO = superAdminLoginInput;

export interface SuperAdminLoginResponseDTO {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      email: string;
      role: string;
    };
  };
}
