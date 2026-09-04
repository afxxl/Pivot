import { Router } from "express";
import { container } from "../../container/inversify.container";
import { Types } from "../../container/types";
import { InviteController } from "../controllers/invite/InviteController";
import { validateRequest } from "../middlewares/validateRequest";
import { sendCompanyInviteSchema } from "../../../shared/validation/inviteSchema";
import {
  authenticate,
  requireAdmin,
  requireAuth,
} from "../middlewares/authenticate";
import { AdminController } from "../controllers/admin/AdminController";
import { UpdateCompanyProfileSchema } from "../../../shared/validation/adminSchemas";

const router = Router();

const inviteController = container.get<InviteController>(
  Types.InviteController,
);

const adminController = container.get<AdminController>(Types.AdminController);

router.use(authenticate);

router.post(
  "/members/invite",
  validateRequest(sendCompanyInviteSchema),
  inviteController.sendCompanyInvite,
);

router.get(
  "/company",
  requireAuth,
  requireAdmin,
  adminController.getCompanyProfile,
);

router.put(
  "/company",
  requireAuth,
  requireAdmin,
  validateRequest(UpdateCompanyProfileSchema),
  adminController.updateCompanyProfile,
);

export default router;
