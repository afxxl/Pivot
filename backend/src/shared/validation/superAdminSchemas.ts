import { z } from "zod";

export const superAdminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type superAdminLoginInput = z.infer<typeof superAdminLoginSchema>;

export const getAllCompaniesSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  search: z.string().optional().default(""),
  status: z
    .enum(["active", "inactive", "trial", "suspended", "deleted"])
    .optional(),
  plan: z
    .enum(["free", "trial", "starter", "professional", "enterprise"])
    .optional(),
  sortBy: z
    .enum(["name", "createdAt", "lastActive"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});
export type getAllCompaniesInput = z.infer<typeof getAllCompaniesSchema>;

export const updateCompanySubscriptionSchema = z
  .object({
    plan: z
      .enum(["free", "trial", "starter", "professional", "enterprise"])
      .optional(),
    billingCycle: z.enum(["monthly", "annual"]).optional(),
    subscriptionStatus: z.enum(["active", "cancelled", "expired"]).optional(),
    startDate: z.string().datetime().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdateCompanySubscriptionInput = z.infer<
  typeof updateCompanySubscriptionSchema
>;

export const superAdminUpdateCompanySchema = z
  .object({
    name: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters")
      .optional(),

    email: z.string().email("Please provide a valid email address").optional(),

    phone: z
      .string()
      .min(7, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^[+\d\s-]+$/, "Phone number contains invalid characters")
      .optional(),

    website: z.string().url("Please provide a valid website URL").optional(),

    status: z
      .enum(["active", "inactive", "trial", "suspended", "deleted"])
      .optional(),
  })
  .strict();

export type SuperAdminUpdateCompanyInput = z.infer<
  typeof superAdminUpdateCompanySchema
>;
