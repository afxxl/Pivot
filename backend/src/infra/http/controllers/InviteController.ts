import { inject, injectable } from "inversify";
import { Types } from "../../container/types";
import { SendCompanyInviteUseCase } from "../../../core/use-cases/SendCompanyInviteUseCase";
import { NextFunction, Request, Response } from "express";
import { VerifyTokenUseCase } from "../../../core/use-cases/VerifyTokenUseCase";
import { AcceptInviteUseCase } from "../../../core/use-cases/AcceptInviteUseCase";
import { SendWorkspaceInviteUseCase } from "../../../core/use-cases/SendWorkspaceInviteUseCase";

@injectable()
export class InviteController {
  constructor(
    @inject(Types.SendCompanyInviteUseCase)
    private sendCompanyInviteUseCase: SendCompanyInviteUseCase,
    @inject(Types.VerifyTokenUseCase)
    private verifyTokenUseCase: VerifyTokenUseCase,
    @inject(Types.AcceptInviteUseCase)
    private acceptInviteUseCase: AcceptInviteUseCase,
    @inject(Types.SendWorkspaceInviteUseCase)
    private sendWorkspaceInviteUseCase: SendWorkspaceInviteUseCase,
  ) {}

  sendCompanyInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
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

  sendWorkspaceInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.sendWorkspaceInviteUseCase.execute(
        req.body,
        req.user?.userId as string,
        req.user?.companyId as string,
      );
      res.status(201).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const token = req.params.token;
      const result = await this.verifyTokenUseCase.execute({ token });
      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  acceptInvite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.acceptInviteUseCase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.status(201).json(result.response);
    } catch (error) {
      next(error);
    }
  };
}
