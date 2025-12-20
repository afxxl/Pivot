import { Router } from "express";
import { container } from "../../container/inversify.container";
import { validateRequest } from "../middlewares/validateRequest";
import {
  loginSchema,
  sendCompanyInviteSchema,
  signupSchema,
} from "../../../shared/validation/authSchemas";
import { Types } from "../../container/types";
import { AuthController } from "../controllers/AuthController";
import { resolveSubdomain } from "../middlewares/resolveSubdomain";
import { authenticate, requireCompanyAdmin } from "../middlewares/authenticate";

const router = Router();

const authController = container.get<AuthController>(Types.AuthController);

router.post("/signup", validateRequest(signupSchema), authController.signup);
router.post(
  "/login",
  validateRequest(loginSchema),
  resolveSubdomain(),
  authController.login,
);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

// Invite Routes

router.post(
  "/invite",
  authenticate,
  requireCompanyAdmin,
  validateRequest(sendCompanyInviteSchema),
  authController.inviteUser,
);

export default router;
