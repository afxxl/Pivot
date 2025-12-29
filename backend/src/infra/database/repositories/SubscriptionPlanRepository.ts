import { injectable } from "inversify";
import { SubscriptionPlan } from "../../../core/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../core/repositories/ISubscriptionPlanRepository";
import { v4 as uuidv4 } from "uuid";
import SubscriptionPlanModel from "../models/SubscriptionPlanModel";
import { SubscriptionPlanNotFoundError } from "../../../shared/errors";

@injectable()
export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
  async create(
    planData: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt">,
  ): Promise<SubscriptionPlan> {
    const doc = new SubscriptionPlanModel({
      _id: uuidv4(),
      ...planData,
    });
    await doc.save();
    return this.toEntity(doc);
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    const plans = await SubscriptionPlanModel.find().sort({ monthlyPrice: 1 });
    return plans.map((plan) => this.toEntity(plan));
  }

  async findById(planId: string): Promise<SubscriptionPlan | null> {
    const plan = await SubscriptionPlanModel.findById(planId);
    return plan ? this.toEntity(plan) : null;
  }

  async findByName(name: string): Promise<SubscriptionPlan | null> {
    const plan = await SubscriptionPlanModel.findOne({ name });
    return plan ? this.toEntity(plan) : null;
  }

  async update(
    planId: string,
    data: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan> {
    const plan = await SubscriptionPlanModel.findByIdAndUpdate(
      planId,
      { $set: data },
      { new: true, runValidators: true },
    );
    if (!plan) {
      throw new SubscriptionPlanNotFoundError();
    }
    return this.toEntity(plan);
  }

  async delete(planId: string): Promise<boolean> {
    const plan = await SubscriptionPlanModel.findByIdAndUpdate(
      planId,
      { $set: { isActive: false } },
      { new: true },
    );

    return !!plan;
  }

  async findActive(): Promise<SubscriptionPlan[]> {
    const plans = await SubscriptionPlanModel.find({ isActive: true }).sort({
      monthlyPrice: 1,
    });
    return plans.map((plan) => this.toEntity(plan));
  }

  private toEntity(doc: any): SubscriptionPlan {
    return {
      id: doc._id,
      name: doc.name,
      description: doc.description,
      monthlyPrice: doc.monthlyPrice,
      annualPrice: doc.annualPrice,
      features: doc.features,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
