import { inject, injectable } from "inversify";
import { Types } from "../../../container/types";
import { SuperAdminLoginUseCase } from "../../../../core/use-cases/super-admin/SuperAdminLoginUseCase";
import { NextFunction, Request, Response } from "express";
import {
  CreateSubscriptionPlanUseCase,
  DeleteSubscriptionPlanUseCase,
  GetAllCompaniesUseCase,
  GetAllSubscriptionPlansUseCase,
  GetSubscriptionPlanByIdUseCase,
  UpdateSubscriptionPlanUseCase,
} from "../../../../core/use-cases/super-admin";
import { GetCompanyUseCase } from "../../../../core/use-cases/super-admin/GetCompanyUseCase";
import { UpdateCompanySubscriptionUseCase } from "../../../../core/use-cases/super-admin/UpdateCompanySubscriptionUseCase";

@injectable()
export class SuperAdminController {
  constructor(
    @inject(Types.SuperAdminLoginUseCase)
    private superAdminLoginUseCase: SuperAdminLoginUseCase,

    @inject(Types.GetAllCompaniesUseCase)
    private getAllCompaniesUseCase: GetAllCompaniesUseCase,

    @inject(Types.GetCompanyUseCase)
    private getCompanyUseCase: GetCompanyUseCase,

    @inject(Types.GetAllSubscriptionPlansUseCase)
    private getAllSubscriptionPlansUseCase: GetAllSubscriptionPlansUseCase,

    @inject(Types.GetSubscriptionPlanByIdUseCase)
    private getSubscriptionPlanByIdUseCase: GetSubscriptionPlanByIdUseCase,

    @inject(Types.CreateSubscriptionPlanUseCase)
    private createSubscriptionPlanUseCase: CreateSubscriptionPlanUseCase,

    @inject(Types.UpdateSubscriptionPlanUseCase)
    private updateSubscriptionPlanUseCase: UpdateSubscriptionPlanUseCase,

    @inject(Types.DeleteSubscriptionPlanUseCase)
    private deleteSubscriptionPlanUseCase: DeleteSubscriptionPlanUseCase,

    @inject(Types.UpdateCompanySubscriptionUseCase)
    private updateCompanySubscriptionUseCase: UpdateCompanySubscriptionUseCase,
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

  getCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getCompanyUseCase.execute(req.params.id);

      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  getAllSubscriptionPlans = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getAllSubscriptionPlansUseCase.execute();
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  getSubscriptionPlanById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.getSubscriptionPlanByIdUseCase.execute(
        req.params.id,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  createSubscriptionPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.createSubscriptionPlanUseCase.execute(req.body);
      res.status(201).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  updateSubscriptionPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.updateSubscriptionPlanUseCase.execute(
        req.params.id,
        req.body,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  deleteSubscriptionPlan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.deleteSubscriptionPlanUseCase.execute(
        req.params.id,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  updateCompanySubscription = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.updateCompanySubscriptionUseCase.execute(
        req.params.id,
        req.body,
      );
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };
}
