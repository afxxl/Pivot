import { z } from "zod";
import { updateCompanySubscriptionSchema } from "./superAdminSchemas";

export const UpdateCompanyProfileSchema = z
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

    website: z
      .string()
      .url("Please provide a valid website URL (e.g., https://example.com)")
      .optional(),

    logo: z.string().url("Logo must be a valid URL").optional(),
  })
  .strict();

export type UpdateCompanyProfileInput = z.infer<
  typeof UpdateCompanyProfileSchema
>;
