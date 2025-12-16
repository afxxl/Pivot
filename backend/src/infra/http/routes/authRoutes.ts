import { Router } from "express";
import { container } from "../../container/Container";
import { validateRequest } from "../middlewares/validateRequest";
import {
  loginSchema,
  signupSchema,
} from "../../../shared/validation/authSchemas";

const router = Router();

const authController = container.authController;

router.post("/signup", validateRequest(signupSchema), authController.signup);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
