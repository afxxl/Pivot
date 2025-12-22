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
      subdomain: string;
    };
    workspace?: {
      id: string;
      name: string;
    };
    invitedBy: {
      name: string;
      email: string;
    };
    expiresAt: string;
    expiresInHours: number;
    warning?: {
      code: string;
      message: string;
      action: string;
    };
  };
}
