import { Router } from "express";
import { container } from "../../container/inversify.container";
import { validateRequest } from "../middlewares/validateRequest";
import {
  acceptInviteSchema,
  sendCompanyInviteSchema,
} from "../../../shared/validation/inviteSchema";
import { Types } from "../../container/types";
import { authenticate, requireCompanyAdmin } from "../middlewares/authenticate";
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

router.get("/verify/:token", verifyTokenLimiter, inviteController.verifyToken);

router.post(
  "/accept",
  validateRequest(acceptInviteSchema),
  inviteController.acceptInvite,
);

export default router;
