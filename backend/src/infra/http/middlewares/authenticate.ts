import { NextFunction, Response, Request } from "express";
import { container } from "../../container/inversify.container";
import { Types } from "../../container/types";
import { ITokenService } from "../../../core/services/ITokenService";
import { UnauthorizedError, TokenExpiredError } from "../../../shared/errors";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      next(new TokenExpiredError("Token has expired. Please refresh."));
    } else if (error.name === "JsonWebTokenError") {
      next(new UnauthorizedError("Invalid token"));
    } else {
      next(error);
    }
  }
};

export const requireCompanyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    return next(new UnauthorizedError("User not authenticated"));
  }

  if (req.user.role !== "company_admin") {
    return next(new UnauthorizedError("Company admin access required"));
  }
  next();
};

export const requireWorkspaceAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    return next(new UnauthorizedError("User not authenticated"));
  }

  if (
    req.user.role !== "workspace_admin" &&
    req.user.role !== "company_admin"
  ) {
    return next(
      new UnauthorizedError("Workspace admin or company admin access required"),
    );
  }
  next();
};

export const requireAuth = authenticate;
