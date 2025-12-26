import { Router } from "express";
import authRoutes from "./authRoutes";
import inviteRoutes from "./inviteRoutes";
import superAdminRoutes from "./superAdminRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/invite", inviteRoutes);
router.use("/super-admin", superAdminRoutes);

export default router;
