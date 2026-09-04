import { UpdateCompanyProfileInput } from "../../../shared/validation/adminSchemas";

export type UpdateCompanyProfileRequestDTO = UpdateCompanyProfileInput;
export interface UpdateCompanyProfileResponseDTO {
  success: boolean;
  message: string;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      website?: string;
      logo?: string;
      updatedAt: string;
    };
  };
}
