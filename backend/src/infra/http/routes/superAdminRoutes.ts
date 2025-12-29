import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import {
  getAllCompaniesSchema,
  superAdminLoginSchema,
  updateCompanySubscriptionSchema,
} from "../../../shared/validation/superAdminSchemas";
import { superAdminLoginLimiter } from "../middlewares/rateLimiter";
import { container } from "../../container/inversify.container";
import { SuperAdminController } from "../controllers/super-admin/SuperAdminController";
import { Types } from "../../container/types";
import { requireAuth } from "../middlewares/authenticate";
import { requireSuperAdmin } from "../middlewares/authenticateSuper_admin";
import {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
} from "../../../shared/validation/subscriptionPlanSchemas";

const router = Router();

let superAdminController = container.get<SuperAdminController>(
  Types.SuperAdminController,
);

router.post(
  "/login",
  superAdminLoginLimiter,
  validateRequest(superAdminLoginSchema),
  superAdminController.loginSuperAdmin,
);

router.get(
  "/companies",
  requireAuth,
  requireSuperAdmin,
  validateRequest(getAllCompaniesSchema),
  superAdminController.getAllCompanies,
);

router.get(
  "/companies/:id",
  requireAuth,
  requireSuperAdmin,
  superAdminController.getCompany,
);

router.get(
  "/subscription-plans",
  requireAuth,
  requireSuperAdmin,
  superAdminController.getAllSubscriptionPlans,
);

router.get(
  "/subscription-plans/:id",
  requireAuth,
  requireSuperAdmin,
  superAdminController.getSubscriptionPlanById,
);

router.post(
  "/subscription-plans",
  requireAuth,
  requireSuperAdmin,
  validateRequest(createSubscriptionPlanSchema),
  superAdminController.createSubscriptionPlan,
);

router.put(
  "/subscription-plans/:id",
  requireAuth,
  requireSuperAdmin,
  validateRequest(updateSubscriptionPlanSchema),
  superAdminController.updateSubscriptionPlan,
);

router.delete(
  "/subscription-plans/:id",
  requireAuth,
  requireSuperAdmin,
  superAdminController.deleteSubscriptionPlan,
);

router.put(
  "/companies/:id/subscription",
  requireAuth,
  requireSuperAdmin,
  validateRequest(updateCompanySubscriptionSchema),
  superAdminController.updateCompanySubscription,
);

export default router;
