import { Router } from "express";
import { container } from "../../container/inversify.container";
import { validateRequest } from "../middlewares/validateRequest";
import {
  acceptInviteSchema,
  sendCompanyInviteSchema,
  sendWorkspaceInviteSchema,
} from "../../../shared/validation/inviteSchema";
import { Types } from "../../container/types";
import {
  authenticate,
  requireCompanyAdmin,
  requireWorkspaceAdmin,
} from "../middlewares/authenticate";
import { InviteController } from "../controllers/InviteController";
import { verifyTokenLimiter } from "../middlewares/rateLimiter";

const router = Router();

const inviteController = container.get<InviteController>(
  Types.InviteController,
);

router.post(
  "/",
  authenticate,
  requireCompanyAdmin,
  validateRequest(sendCompanyInviteSchema),
  inviteController.sendCompanyInvite,
);

router.post(
  "/workspace-invite",
  authenticate,
  requireWorkspaceAdmin,
  validateRequest(sendWorkspaceInviteSchema),
  inviteController.sendWorkspaceInvite,
);

router.get("/verify/:token", verifyTokenLimiter, inviteController.verifyToken);

router.post(
  "/accept",
  validateRequest(acceptInviteSchema),
  inviteController.acceptInvite,
);

export default router;
