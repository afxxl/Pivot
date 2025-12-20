export interface Invite {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "workspace_admin" | "project_manager" | "member";
  companyId: string;
  workspaceId?: string;
  invitedBy: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
