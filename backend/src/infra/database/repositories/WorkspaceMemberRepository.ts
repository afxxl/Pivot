import { IWorkspaceMemberRepository } from "../../../core/repositories/IWorkspaceMemberRepository";
import { WorkspaceMember } from "../../../core/entities/WorkspaceMember";
import { v4 as uuidv4 } from "uuid";
import workspaceMemberModel from "../models/WorkspaceMemberModel";
import { injectable } from "inversify";

@injectable()
export class WorkspaceMemberRepository implements IWorkspaceMemberRepository {
  async create(
    workspaceMemberData: Omit<
      WorkspaceMember,
      "id" | "createdAt" | "updatedAt"
    >,
  ): Promise<WorkspaceMember> {
    const doc = new workspaceMemberModel({
      _id: uuidv4(),
      ...workspaceMemberData,
      joinedAt: new Date(),
    });

    await doc.save();
    return this.toEntity(doc);
  }

  async findByWorkspaceId(workspaceId: string): Promise<WorkspaceMember[]> {
    const workspacemembers = await workspaceMemberModel.find({ workspaceId });
    return workspacemembers.map((doc) => this.toEntity(doc));
  }

  async findByUserId(userId: string): Promise<WorkspaceMember[]> {
    const workspacemembers = await workspaceMemberModel.find({ userId });
    return workspacemembers.map((doc) => this.toEntity(doc));
  }

  async findWorkspaceAndUser(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceMember | null> {
    const workspacemember = await workspaceMemberModel.findOne({
      workspaceId,
      userId,
    });
    return workspacemember ? this.toEntity(workspacemember) : null;
  }

  async updateRole(
    workspaceId: string,
    userId: string,
    role: string,
  ): Promise<WorkspaceMember> {
    const updatedWorkspaceMember = await workspaceMemberModel.findOneAndUpdate(
      { workspaceId, userId },
      { $set: { role } },
      { new: true },
    );

    if (!updatedWorkspaceMember) {
      throw new Error("WorkspaceMember not found");
    }

    return this.toEntity(updatedWorkspaceMember);
  }

  async remove(workspaceId: string, userId: string): Promise<void> {
    await workspaceMemberModel.deleteOne({ workspaceId, userId });
  }

  async removeAllByUserId(userId: string): Promise<void> {
    await workspaceMemberModel.deleteMany({ userId });
  }

  async isMember(workspaceId: string, userId: string): Promise<boolean> {
    let count = await workspaceMemberModel.countDocuments({
      workspaceId,
      userId,
    });
    return count > 0;
  }

  private toEntity(doc: any): WorkspaceMember {
    return {
      id: doc._id,
      workspaceId: doc.workspaceId,
      userId: doc.userId,
      role: doc.role,
      joinedAt: doc.joinedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
