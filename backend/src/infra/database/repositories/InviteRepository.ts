import { Invite } from "../../../core/entities/Invite";
import { IInviteRepository } from "../../../core/repositories/IInviteRepository";
import InviteModel from "../models/InviteModel";
import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { InviteNotFoundError } from "../../../shared/errors/inviteError";
import { IUnitWork } from "../../../core/uow/IUnitWork";
import { MongooseUnitOfWork } from "../../uow/MongooseUnitOfWork";

@injectable()
export class InviteRepository implements IInviteRepository {
  async create(
    inviteData: Omit<Invite, "id" | "createdAt" | "updatedAt">,
  ): Promise<Invite> {
    const doc = new InviteModel({
      _id: uuidv4(),
      ...inviteData,
    });
    await doc.save();
    return this.toEntity(doc);
  }

  async findByToken(token: string): Promise<Invite | null> {
    const doc = await InviteModel.findOne({ token });
    return doc ? this.toEntity(doc) : null;
  }

  async findByEmailAndCompany(
    email: string,
    companyId: string,
    status?: string,
  ): Promise<Invite | null> {
    const doc = await InviteModel.findOne({
      email,
      companyId,
      status,
    });
    return doc ? this.toEntity(doc) : null;
  }

  async findPendingByCompany(
    companyId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ invites: Invite[]; total: number }> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      InviteModel.find({ companyId, status: "pending" })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      InviteModel.countDocuments({ companyId, status: "pending" }),
    ]);

    return { invites: docs.map((x) => this.toEntity(x)), total };
  }

  async findPendingByWorkspace(
    workspaceId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ invites: Invite[]; total: number }> {
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      InviteModel.find({ workspaceId, status: "pending" })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      InviteModel.countDocuments({ workspaceId, status: "pending" }),
    ]);
    return { invites: docs.map((x) => this.toEntity(x)), total };
  }

  async findById(inviteId: string): Promise<Invite | null> {
    const doc = await InviteModel.findById(inviteId);
    return doc ? this.toEntity(doc) : null;
  }

  async findByWorkspaceIdAndEmail(
    workspaceId: any,
    email: any,
  ): Promise<Invite | null> {
    const doc = await InviteModel.findOne({ workspaceId, email });
    return doc ? this.toEntity(doc) : null;
  }

  async update(
    inviteId: string,
    inviteData: Partial<Invite>,
    uow?: IUnitWork,
  ): Promise<Invite> {
    let session =
      uow instanceof MongooseUnitOfWork ? uow.getSession() : undefined;
    const doc = await InviteModel.findByIdAndUpdate(
      inviteId,
      { $set: inviteData },
      { new: true, runValidators: true, session: session },
    );

    if (!doc) {
      throw new InviteNotFoundError();
    }

    return this.toEntity(doc);
  }

  async delete(inviteId: string): Promise<void> {
    const result = await InviteModel.findByIdAndDelete(inviteId);
    if (!result) {
      throw new InviteNotFoundError();
    }
  }

  private toEntity(doc: any): Invite {
    return {
      id: doc._id,
      token: doc.token,
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      role: doc.role,
      companyId: doc.companyId,
      workspaceId: doc.workspaceId,
      invitedBy: doc.invitedBy,
      status: doc.status,
      expiresAt: doc.expiresAt,
      acceptedAt: doc.acceptedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
