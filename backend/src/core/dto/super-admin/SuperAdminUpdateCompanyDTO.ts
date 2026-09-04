import { SuperAdminUpdateCompanyInput } from "../../../shared/validation/superAdminSchemas";

export type SuperAdminUpdateCompanyRequestDTO = SuperAdminUpdateCompanyInput;

export interface SuperAdminUpdateCompanyResponseDTO {
  success: boolean;
  message: string;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      website?: string;
      status: string;
      updatedAt: string;
    };
  };
}
