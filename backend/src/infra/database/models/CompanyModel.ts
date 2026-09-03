import { Schema, model } from "mongoose";

interface ICompany {
  _id: string;
  name: string;
  email: string;
  subdomain: string;
  phone?: string;
  website?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  status: "active" | "inactive" | "trial" | "suspended" | "deleted";

  subscriptionPlan:
  | "free"
  | "trial"
  | "starter"
  | "professional"
  | "enterprise";
  subscriptionStatus?: "active" | "cancelled" | "expired";
  billingCycle?: "monthly" | "annual";
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  nextBillingDate?: Date;
  monthlyPrice?: number;

  lastActiveAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subdomain: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    website: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "trial", "suspended", "deleted"],
      default: "active",
    },

    subscriptionPlan: {
      type: String,
      enum: ["free", "trial", "starter", "professional", "enterprise"],
      default: "trial",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "annual"],
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    nextBillingDate: { type: Date },
    monthlyPrice: { type: Number },

    lastActiveAt: { type: Date },
  },
  {
    timestamps: true,
    _id: false,
  },
);

CompanySchema.index({ email: 1 });
CompanySchema.index({ subdomain: 1 });
CompanySchema.index({ status: 1 });
CompanySchema.index({ subscriptionPlan: 1 });

const CompanyModel = model<ICompany>("Company", CompanySchema);

export default CompanyModel;
