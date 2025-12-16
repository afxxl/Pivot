import { LoginUseCase } from "../../../core/use-cases/LoginUseCase";
import { SignupUseCase } from "../../../core/use-cases/SignupUseCase";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(
    private signupUseCase: SignupUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.signupUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
