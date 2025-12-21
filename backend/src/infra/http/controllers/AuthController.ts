import { LoginUseCase } from "../../../core/use-cases/LoginUseCase";
import { SignupUseCase } from "../../../core/use-cases/SignupUseCase";
import { RefreshTokenUseCase } from "../../../core/use-cases/RefreshTokenUseCase";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { Types } from "../../container/types";
import { SendCompanyInviteUseCase } from "../../../core/use-cases/SendCompanyInviteUseCase";

@injectable()
export class AuthController {
  constructor(
    @inject(Types.SignupUseCase)
    private signupUseCase: SignupUseCase,

    @inject(Types.LoginUseCase)
    private loginUseCase: LoginUseCase,

    @inject(Types.RefreshTokenUseCase)
    private refreshTokenUseCase: RefreshTokenUseCase,

    @inject(Types.SendCompanyInviteUseCase)
    private sendCompanyInviteUseCase: SendCompanyInviteUseCase,
  ) {}

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.signupUseCase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/auth",
      });

      res.status(201).json(result.response);
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
      const result = await this.loginUseCase.execute(
        req.body,
        req.subdomain as string,
      );

      const cookieMaxAge = req.body.rememberMe
        ? 30 * 24 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000;

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: cookieMaxAge,
        path: "/auth",
      });

      res.status(200).json(result.response);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          error: {
            code: "NO_REFRESH_TOKEN",
            message: "Refresh token not found",
          },
        });
        return;
      }

      const result = await this.refreshTokenUseCase.execute({ refreshToken });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth",
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  sendCompanyInvite = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      const result = await this.sendCompanyInviteUseCase.execute(
        req.body,
        req.user?.userId as string,
        req.user?.companyId as string,
      );

      res.status(201).json(result.response);
    } catch (error) {
      _next(error);
    }
  };
}
