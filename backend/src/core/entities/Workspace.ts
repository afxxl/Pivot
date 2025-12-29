export interface Workspace {
  id: string;
  name: string;
  description?: string;
  companyId: string;
  status: "active" | "archived" | "deleted";
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
