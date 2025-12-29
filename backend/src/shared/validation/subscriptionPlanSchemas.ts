import { z } from "zod";

export const createSubscriptionPlanSchema = z.object({
  name: z
    .string()
    .min(2, "Plan name must be at least 2 characters")
    .max(50, "Plan name cannot exceed 50 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters")
    .trim(),
  monthlyPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Monthly price must be a valid number with up to 2 decimal places",
    )
    .refine((val) => parseFloat(val) >= 0, {
      message: "Monthly price cannot be negative",
    }),
  annualPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Annual price must be a valid number with up to 2 decimal places",
    )
    .refine((val) => parseFloat(val) >= 0, {
      message: "Annual price cannot be negative",
    }),
  features: z.object({
    maxUsers: z
      .number()
      .int("Max users must be an integer")
      .refine((val) => val === -1 || val > 0, {
        message: "Max users must be positive or -1 for unlimited",
      }),
    maxWorkspaces: z
      .number()
      .int("Max workspaces must be an integer")
      .refine((val) => val === -1 || val > 0, {
        message: "Max workspaces must be positive or -1 for unlimited",
      }),
    maxProjects: z
      .number()
      .int("Max projects must be an integer")
      .refine((val) => val === -1 || val > 0, {
        message: "Max projects must be positive or -1 for unlimited",
      }),
    maxStorageGB: z
      .number()
      .min(0, "Max storage cannot be negative")
      .nonnegative("Max storae must be a positive number"),
    supportLevel: z.enum(["community", "email", "priority", "dedicated"], {
      error:
        "Support level must be one of: community, email, priority, dedicated",
    }),
    customFields: z.boolean().optional().default(false),
    integrations: z
      .union([z.array(z.string()), z.literal("all")])
      .optional()
      .default([]),
    advancedReports: z.boolean().optional().default(false),
    apiAccess: z.boolean().optional().default(false),
    sso: z.boolean().optional().default(false),
    customDomain: z.boolean().optional().default(false),
    auditLogs: z.boolean().optional().default(false),
    trialDays: z
      .number()
      .int("Trial days must be an integer")
      .min(0, "Trial days cannot be negative")
      .optional()
      .default(0),
  }),
  isActive: z.boolean().default(true),
});

export type CreateSubscriptionPlanInput = z.infer<
  typeof createSubscriptionPlanSchema
>;

export const updateSubscriptionPlanSchema = z
  .object({
    name: z
      .string()
      .min(2, "Plan name must be at least 2 characters")
      .max(50, "Plan name cannot exceed 50 characters")
      .trim()
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description cannot exceed 200 characters")
      .trim()
      .optional(),
    monthlyPrice: z
      .string()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Monthly price must be a valid number with up to 2 decimal places",
      )
      .refine((val) => parseFloat(val) >= 0, {
        message: "Monthly price cannot be negative",
      })
      .optional(),
    annualPrice: z
      .string()
      .regex(
        /^\d+(\.\d{1,2})?$/,
        "Annual price must be a valid number with up to 2 decimal places",
      )
      .refine((val) => parseFloat(val) >= 0, {
        message: "Annual price cannot be negative",
      })
      .optional(),
    features: z
      .object({
        maxUsers: z
          .number()
          .int("Max users must be an integer")
          .refine((val) => val === -1 || val > 0, {
            message: "Max users must be positive or -1 for unlimited",
          })
          .optional(),
        maxWorkspaces: z
          .number()
          .int("Max workspaces must be an integer")
          .refine((val) => val === -1 || val > 0, {
            message: "Max workspaces must be positive or -1 for unlimited",
          })
          .optional(),
        maxProjects: z
          .number()
          .int("Max projects must be an integer")
          .refine((val) => val === -1 || val > 0, {
            message: "Max projects must be positive or -1 for unlimited",
          })
          .optional(),
        maxStorageGB: z
          .number()
          .min(0, "Max storage cannot be negative")
          .nonnegative("Max storage must be a positive number")
          .optional(),
        supportLevel: z
          .enum(["community", "email", "priority", "dedicated"], {
            error:
              "Support level must be one of: community, email, priority, dedicated",
          })
          .optional(),
        customFields: z.boolean().optional(),
        integrations: z
          .union([z.array(z.string()), z.literal("all")])
          .optional(),
        advancedReports: z.boolean().optional(),
        apiAccess: z.boolean().optional(),
        sso: z.boolean().optional(),
        customDomain: z.boolean().optional(),
        auditLogs: z.boolean().optional(),
        trialDays: z
          .number()
          .int("Trial days must be an integer")
          .min(0, "Trial days cannot be negative")
          .optional(),
      })
      .optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdateSubscriptionPlanInput = z.infer<
  typeof updateSubscriptionPlanSchema
>;

export const getSubscriptionPlanByIdSchema = z.object({
  id: z.string().uuid("Invalid subscription plan ID format"),
});

export type GetSubscriptionPlanByIdInput = z.infer<
  typeof getSubscriptionPlanByIdSchema
>;
