export interface Workspace {
  id: string;
  name: string;
  description?: string;
  companyId: string;
  memberCount?: number;
  projectCount?: number;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
