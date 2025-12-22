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
  storageUsed?: number;
  storageLimit?: number;
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
    billingCycle: { type: String, enum: ["monthly", "annual"] },
    storageUsed: { type: Number, default: 0 },
    storageLimit: { type: Number, default: 5368709120 },
  },
  {
    timestamps: true,
    _id: false,
  },
);

const CompanyModel = model<ICompany>("Company", CompanySchema);

export default CompanyModel;
