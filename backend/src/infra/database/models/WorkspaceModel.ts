import { Schema, model } from "mongoose";

interface IWorkspace {
  _id: string;
  name: string;
  description?: string;
  companyId: string;
  status: "active" | "archived" | "deleted";
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new Schema<IWorkspace>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    companyId: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    createdBy: { type: String },
  },
  {
    timestamps: true,
    _id: false,
  },
);

WorkspaceSchema.index({ companyId: 1 });
WorkspaceSchema.index({ status: 1 });
WorkspaceSchema.index({ companyId: 1, status: 1 });

const WorkspaceModel = model<IWorkspace>("Workspace", WorkspaceSchema);

export default WorkspaceModel;
