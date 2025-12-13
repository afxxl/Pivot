import { Schema, model } from "mongoose";

interface IWorkspace {
  _id: string;
  name: string;
  description?: string;
  companyId: string;
  memberCount?: number;
  projectCount?: number;
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
    memberCount: { type: Number, default: 0 },
    projectCount: { type: Number, default: 0 },
    createdBy: { type: String },
  },
  {
    timestamps: true,
    _id: false,
  },
);

const WorkspaceModel = model<IWorkspace>("Workspace", WorkspaceSchema);

export default WorkspaceModel;
