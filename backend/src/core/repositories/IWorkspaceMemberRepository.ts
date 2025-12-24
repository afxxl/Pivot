import { WorkspaceMember } from "../entities/WorkspaceMember";
import { IUnitWork } from "../uow/IUnitWork";

export interface IWorkspaceMemberRepository {
  create(
    workspaceMemberData: Omit<
      WorkspaceMember,
      "id" | "createdAt" | "updatedAt"
    >,
    uow?: IUnitWork,
  ): Promise<WorkspaceMember>;

  findByWorkspaceId(workspaceId: string): Promise<WorkspaceMember[]>;

  findByUserId(userId: string): Promise<WorkspaceMember[]>;

  findWorkspaceAndUser(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMember | null>;

  updateRole(
    workspaceId: string,
    userId: string,
    role: string,
  ): Promise<WorkspaceMember>;

  remove(workspaceId: string, userId: string): Promise<void>;

  removeAllByUserId(userId: string): Promise<void>;

  isMember(workspaceId: string, userId: string): Promise<boolean>;
}
