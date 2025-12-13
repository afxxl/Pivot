import { Router } from "express";
import { container } from "../../container/Container";

const router = Router();

const authController = container.authController;

router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
