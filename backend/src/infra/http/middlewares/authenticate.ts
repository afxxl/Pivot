import { NextFunction, Response, Request } from "express";
import { UnauthorizedError } from "../../../shared/errors/AuthError";
import { container } from "../../container/inversify.container";
import { Types } from "../../container/types";
import { ITokenService } from "../../../core/services/ITokenService";
import { TokenExpiredError } from "../../../shared/errors/AuthError";

export const authenticate = async (
  req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError("No authorization header");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid authorization format");
    }

    const tokenService = container.get<ITokenService>(Types.TokenService);
    const decoded = tokenService.verifyAccessToken(token);

    if (!decoded) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    req.user = decoded;
    _next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      _next(new TokenExpiredError("Token has expired. Please refresh. "));
    } else if (error.name === "JsonWebTokenError") {
      _next(new UnauthorizedError("Invalid token"));
    } else {
      _next(error);
    }
  }
};

export const requireCompanyAdmin = (
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (!req.user) {
    return _next(new UnauthorizedError("User not authenticated"));
  }

  if (req.user.role !== "company_admin") {
    return _next(new UnauthorizedError("Company admin access required"));
  }
  _next();
};

export const requireWorkspaceAdmin = (
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (!req.user) {
    return _next(new UnauthorizedError("User not authenticated"));
  }

  if (
    req.user.role !== "workspace_admin" &&
    req.user.role !== "company_admin"
  ) {
    return _next(
      new UnauthorizedError("Workspace admin or company admin access required"),
    );
  }
  _next();
};

export const requireAuth = authenticate;
