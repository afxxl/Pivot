import { sendCompanyInviteInput } from "../../shared/validation/inviteSchema";

export type SendCompanyInviteRequestDTO = sendCompanyInviteInput;

export interface SendCompanyInviteResponseDTO {
  success: boolean;
  message: string;
  data: {
    inviteId: string;
    email: string;
    role: string;
    expiresAt: string;
    invitedBy: {
      name: string;
      email: string;
    };
  };
}
