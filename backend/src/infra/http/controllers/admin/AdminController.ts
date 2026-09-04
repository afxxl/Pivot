import { inject, injectable } from "inversify";
import { GetCompanyProfileUseCase } from "../../../../core/use-cases/admin/GetCompanyProfileUseCase";
import { Types } from "../../../container/types";
import { NextFunction, Request, Response } from "express";
import { UpdateCompanyProfileUseCase } from "../../../../core/use-cases/admin/UpdateCompanyProfileUseCase";

@injectable()
export class AdminController {
  constructor(
    @inject(Types.GetCompanyProfileUseCase)
    private getCompanyProfileUseCase: GetCompanyProfileUseCase,
    @inject(Types.UpdateCompanyProfileUseCase)
    private updateCompanyProfileUseCase: UpdateCompanyProfileUseCase,
  ) {}

  getCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getCompanyProfileUseCase.execute(
        req.user?.companyId as string,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  updateCompanyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.updateCompanyProfileUseCase.execute(
        req.user?.companyId as string,
        req.body,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };
}
