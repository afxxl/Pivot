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

const WorkspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    _id: { type: String, required: true },
    workspaceId: { type: String, required: true },
    userId: { type: String, required: true },
    role: {
      type: String,
      enum: ["workspace_admin", "project_manager", "member"],
      default: "member",
    },
    joinedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

WorkspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });
WorkspaceMemberSchema.index({ workspaceId: 1 });
WorkspaceMemberSchema.index({ userId: 1 });

const WorkspaceMemberModel = model<IWorkspaceMember>(
  "WorkspaceMember",
  WorkspaceMemberSchema,
);

export default WorkspaceMemberModel;
