import { Router } from "express";
import { UserRepository } from "../../database/repositories/UserRepository";
import { CompanyRepository } from "../../database/repositories/CompanyRepository";
import { SignupUseCase } from "../../../core/use-cases/SignupUseCase";
import { AuthController } from "../controllers/AuthController";

const router = Router();

const userRepository = new UserRepository();
const companyRepository = new CompanyRepository();

const signUpCase = new SignupUseCase(userRepository, companyRepository);

const authController = new AuthController(signUpCase);

router.post("/signup", authController.signup);

export default router;
