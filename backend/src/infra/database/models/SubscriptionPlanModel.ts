import { Schema, model } from "mongoose";

export interface ISubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  annualPrice: string;
  features: {
    maxUsers: number;
    maxWorkspaces: number;
    maxProjects: number;
    maxStorageGB: number;
    supportLevel: "community" | "email" | "priority" | "dedicated";
    customFields?: boolean;
    integrations?: string[] | "all";
    advancedReports?: boolean;
    apiAccess?: boolean;
    sso?: boolean;
    customDomain?: boolean;
    auditLogs?: boolean;
    trialDays?: number;
  };
  isActive: boolean;
  createdAt: Date;
  opdatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    monthlyPrice: {
      type: String,
      required: true,
      min: 0,
    },
    annualPrice: {
      type: String,
      required: true,
      min: 0,
    },
    features: {
      maxUsers: {
        type: Number,
        required: true,
      },
      maxWorkspaces: {
        type: Number,
        required: true,
      },
      maxProjects: {
        type: Number,
        required: true,
      },
      maxStorageGB: {
        type: Number,
        required: true,
      },
      supportLevel: {
        type: String,
        enum: ["community", "email", "priority", "dedicated"],
        required: true,
      },
      customFields: {
        type: Boolean,
        default: false,
      },
      integrations: {
        type: Schema.Types.Mixed,
        default: [],
      },
      advancedReports: {
        type: Boolean,
        default: false,
      },
      apiAccess: {
        type: Boolean,
        default: false,
      },
      sso: {
        type: Boolean,
        default: false,
      },
      customDomain: {
        type: Boolean,
        default: false,
      },
      auditLogs: {
        type: Boolean,
        default: false,
      },
      trialDays: {
        type: Number,
        default: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "subscription_plans",
  },
);

SubscriptionPlanSchema.index({ name: 1 });
SubscriptionPlanSchema.index({ isActive: 1 });
SubscriptionPlanSchema.index({ monthlyPrice: 1 });

const SubscriptionPlanModel = model<ISubscriptionPlan>(
  "SubscriptionPlan",
  SubscriptionPlanSchema,
);

export default SubscriptionPlanModel;
