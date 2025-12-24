import { Invite } from "../entities/Invite";
import { IUnitWork } from "../uow/IUnitWork";

export interface IInviteRepository {
  create(
    inviteData: Omit<Invite, "id" | "createdAt" | "updatedAt">,
  ): Promise<Invite>;

  findByToken(token: string): Promise<Invite | null>;

  findByEmailAndCompany(
    email: string,
    companyId: string,
    status?: string,
  ): Promise<Invite | null>;

  findPendingByCompany(
    companyId: string,
    page?: number,
    limit?: number,
  ): Promise<{ invites: Invite[]; total: number }>;

  findPendingByWorkspace(
    workspaceId: string,
    page?: number,
    limit?: number,
  ): Promise<{ invites: Invite[]; total: number }>;

  findById(inviteId: string): Promise<Invite | null>;

  findByWorkspaceIdAndEmail(
    workspaceId: string,
    email: string,
  ): Promise<Invite | null>;

  update(
    inviteId: string,
    inviteData: Partial<Invite>,
    uow?: IUnitWork,
  ): Promise<Invite>;

  delete(inviteId: string): Promise<void>;
}
