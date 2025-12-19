import { NextFunction, Request, Response } from "express";
import { SubdomainNotFoundError } from "../../../shared/errors/AuthError";

export const resolveSubdomain = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    let subdomain: string | undefined;

    const host = req.headers.host ?? "";

    if (!host || host === "pivot.app") {
      res.redirect("https://pivot.app");
      return;
    }

    let parts = host.split(".");

    if (parts[0].toLowerCase() === "www") {
      res.redirect("https://pivot.app");
      return;
    }

    if (host && !host.includes("localhost")) {
      if (
        parts.length >= 3 &&
        parts[parts.length - 2] === "pivot" &&
        parts[parts.length - 1] === "app"
      ) {
        subdomain = parts[0].toLowerCase();
      } else {
        throw new SubdomainNotFoundError("Invalid URL format");
      }
    } else {
      subdomain =
        (req.query.subdomain as string) ||
        (req.headers["x-company-subdomain"] as string);
    }

    if (!subdomain) {
      throw new SubdomainNotFoundError();
    }

    req.subdomain = subdomain;
    next();
  };
};
