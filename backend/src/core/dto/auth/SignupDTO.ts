import { signupInput } from "../../../shared/validation/authSchemas";

export type SignupRequestDTO = signupInput;

export interface SignupResponseDTO {
  success: boolean;
  message: string;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      status: string;
      createdAt: string;
    };
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      status: string;
    };
    token: string;
    expiresAt: string;
  };
}
