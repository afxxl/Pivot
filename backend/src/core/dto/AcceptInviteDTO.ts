import { acceptInviteInput } from "../../shared/validation/inviteSchema";

export type AcceptInviteRequestDTO = acceptInviteInput;

export interface AcceptInviteResponseDTO {
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
      workspace?: {
        id: string;
        name: string;
      };
    };
    token: string;
    redirectTo: string;
  };
}
