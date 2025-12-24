import { Workspace } from "../../../core/entities/Workspace";
import { IWorkspaceRepository } from "../../../core/repositories/IWorkspaceRepository";
import WorkspaceModel from "../models/WorkspaceModel";
import { v4 as uuidv4 } from "uuid";
import workspaceMemberModel from "../models/WorkspaceMemberModel";
import { AppError } from "../../../shared/errors/AppError";
import { injectable } from "inversify";
import { IUnitWork } from "../../../core/uow/IUnitWork";
import { MongooseUnitOfWork } from "../../uow/MongooseUnitOfWork";

@injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
  async create(
    workspaceData: Omit<Workspace, "id" | "createdAt" | "updatedAt">,
  ): Promise<Workspace> {
    const doc = new WorkspaceModel({
      _id: uuidv4(),
      ...workspaceData,
    });

    await doc.save();
    return this.toEntity(doc);
  }

  async findById(workspaceId: string): Promise<Workspace | null> {
    const workspace = await WorkspaceModel.findById(workspaceId);
    return workspace ? this.toEntity(workspace) : null;
  }

  async update(
    workspaceId: string,
    data: Partial<Workspace>,
    uow?: IUnitWork,
  ): Promise<Workspace> {
    let session =
      uow instanceof MongooseUnitOfWork ? uow.getSession() : undefined;
    const workspace = await WorkspaceModel.findByIdAndUpdate(
      workspaceId,
      { $set: data },
      { new: true, runValidators: true, session: session },
    );

    if (!workspace) {
      throw new AppError(404, "WORKSPACE_NOT_FOUND", "Workspace not found");
    }

    return this.toEntity(workspace);
  }

  async delete(workspaceId: string): Promise<Boolean> {
    await WorkspaceModel.findByIdAndDelete(workspaceId);
    return true;
  }

  async findByCompanyId(companyId: string): Promise<Workspace[]> {
    const workspace = await WorkspaceModel.find({ companyId });
    return workspace.map((doc) => this.toEntity(doc));
  }

  async findByUserId(userId: string): Promise<Workspace[]> {
    const workspaceMemberships = await workspaceMemberModel.find({ userId });

    const workspaceIds = workspaceMemberships.map((x) => x.workspaceId);

    const workspaces = await WorkspaceModel.find({
      _id: { $in: workspaceIds },
    });

    return workspaces.map((ws) => this.toEntity(ws));
  }

  private toEntity(doc: any): Workspace {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      companyId: doc.companyId,
      memberCount: doc.memberCount,
      status: doc.status,
      projectCount: doc.projectCount,
      createdBy: doc.createdBy,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
