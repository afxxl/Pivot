import { Workspace } from "../entities/Workspace";

export interface IWorkspaceRepository {
  create(
    workspaceData: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
  ): Promise<Workspace>;
  findById(workspaceId: string): Promise<Workspace | null>;
  update(workspaceId: string, data: Partial<Workspace>): Promise<Workspace>;
  delete(workspaceId: string): Promise<Boolean>;
  findByCompanyId(companyId: string): Promise<Workspace[]>;
  findByUserId(userId: string): Promise<Workspace[]>;
}
