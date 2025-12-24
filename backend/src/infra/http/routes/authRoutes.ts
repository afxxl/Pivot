import { Router } from "express";
import { container } from "../../container/inversify.container";
import { validateRequest } from "../middlewares/validateRequest";
import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
} from "../../../shared/validation/authSchemas";
import { Types } from "../../container/types";
import { AuthController } from "../controllers/AuthController";
import { resolveSubdomain } from "../middlewares/resolveSubdomain";
import {
  forgotPasswordIpLimiter,
  forgotPasswordLimiter,
} from "../middlewares/rateLimiter";

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

router.post(
  "/forgot-password",
  forgotPasswordIpLimiter,
  validateRequest(forgotPasswordSchema),
  forgotPasswordLimiter,
  authController.forgotPassword,
);
export default router;
