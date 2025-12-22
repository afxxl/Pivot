import { z } from "zod";
export const sendCompanyInviteSchema = z.object({
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  firstName: z
    .string()
    .trim()
    .min(2, "First Name must be at least 2 characters")
    .max(100, "First Name must not exceed 100 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last Name must be at least 2 characters")
    .max(100, "Last Name must not exceed 100 characters"),
  role: z.enum(["workspace_admin", "project_manager", "member"]),
});

export type sendCompanyInviteInput = z.infer<typeof sendCompanyInviteSchema>;
