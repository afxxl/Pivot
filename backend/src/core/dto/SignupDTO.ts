import { signupInput } from "../../shared/validation/authSchemas";
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
      subscriptionPlan: string;
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
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      tokenType: string;
    };
    redirectTo: string;
  };
}
