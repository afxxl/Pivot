import { Workspace } from "../entities/Workspace";
import { IUnitWork } from "../uow/IUnitWork";

export interface IWorkspaceRepository {
  create(
    workspaceData: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
  ): Promise<Workspace>;
  findById(workspaceId: string): Promise<Workspace | null>;
  update(
    workspaceId: string,
    data: Partial<Workspace>,
    uow?: IUnitWork,
  ): Promise<Workspace>;
  delete(workspaceId: string): Promise<Boolean>;
  findByCompanyId(companyId: string): Promise<Workspace[]>;
  findByUserId(userId: string): Promise<Workspace[]>;
}
