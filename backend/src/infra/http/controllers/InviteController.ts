import { inject, injectable } from "inversify";
import { Types } from "../../container/types";
import { SendCompanyInviteUseCase } from "../../../core/use-cases/SendCompanyInviteUseCase";
import { NextFunction, Request, Response } from "express";
import { VerifyTokenUseCase } from "../../../core/use-cases/VerifyTokenUseCase";

@injectable()
export class InviteController {
  constructor(
    @inject(Types.SendCompanyInviteUseCase)
    private sendCompanyInviteUseCase: SendCompanyInviteUseCase,
    @inject(Types.VerifyTokenUseCase)
    private verifyTokenUseCase: VerifyTokenUseCase,
  ) {}
  sendCompanyInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.sendCompanyInviteUseCase.execute(
        req.body,
        req.user?.userId as string,
        req.user?.companyId as string,
      );

      res.status(201).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.params.token;
      let result = await this.verifyTokenUseCase.execute({ token });
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };
}
