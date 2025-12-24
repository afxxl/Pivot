import { sendWorkspaceInviteInput } from "../../shared/validation/inviteSchema";

export type sendWorkspaceInviteRequestDTO = sendWorkspaceInviteInput;

export interface sendWorkspaceInviteResponseDTO {
  success: boolean;
  message: string;
  data: {
    type: string;
    invitedId?: string;
    email: string;
    role: string;
    workspace: {
      id: string;
      name: string;
    };
    expiresAt?: string;
    invitedBy: {
      id: string;
      name: string;
      email: string;
    };
  };
}
