export interface VerifyInviteRequestDTO {
  token: string;
}

export interface VerifyInviteResponseDTO {
  success: boolean;
  data: {
    email: string;
    firstName: string;
    lastName: string;
    role: "workspace_admin" | "project_manager" | "member";
    company: {
      id: string;
      name: string;
    };
    workspace?: {
      id: string;
      name: string;
    };
    invitedBy: {
      id: string;
      name: string;
      role: string;
    };
    invitedAt: string;
    expiresAt: string;
  };
}
