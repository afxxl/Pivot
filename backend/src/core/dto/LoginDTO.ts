import { loginInput } from "../../shared/validation/authSchemas";

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
      workspaces?: Array<{
        id: string;
        name: string;
      }>;
    };
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
  redirectTo: string;
}
