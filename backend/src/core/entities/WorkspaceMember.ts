export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  userId: string;
  role?: "workspace_admin" | "project_manager" | "member";
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
