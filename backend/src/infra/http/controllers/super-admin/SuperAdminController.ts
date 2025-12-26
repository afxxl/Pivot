import { inject, injectable } from "inversify";
import { Types } from "../../../container/types";
import { SuperAdminLoginUseCase } from "../../../../core/use-cases/super-admin/SuperAdminLoginUseCase";
import { NextFunction, Request, Response } from "express";
import { GetAllCompaniesUseCase } from "../../../../core/use-cases/super-admin";

@injectable()
export class SuperAdminController {
  constructor(
    @inject(Types.SuperAdminLoginUseCase)
    private superAdminLoginUseCase: SuperAdminLoginUseCase,

    @inject(Types.GetAllCompaniesUseCase)
    private getAllCompaniesUseCase: GetAllCompaniesUseCase,
  ) {}

  loginSuperAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.superAdminLoginUseCase.execute(req.body);
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  getAllCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getAllCompaniesUseCase.execute(
        req.query as any,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };
}
