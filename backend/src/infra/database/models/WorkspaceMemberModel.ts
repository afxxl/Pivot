import { Schema, model } from "mongoose";

interface IWorkspaceMember {
  _id: string;
  workspaceId: string;
  userId: string;
  role?: "workspace_admin" | "project_manager" | "member";
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceMemberSchema = new Schema<IWorkspaceMember>({
  _id: { type: String, required: true },
  workspaceId: { type: String, required: true },
  userId: { type: String, required: true },
  role: { type: String },
  joinedAt: { type: Date, required: true },
});

const workspaceMemberModel = model<IWorkspaceMember>(
  "WorkspaceMember",
  workspaceMemberSchema,
);

export default workspaceMemberModel;
