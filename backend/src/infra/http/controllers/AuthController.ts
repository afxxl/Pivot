import { LoginUseCase } from "../../../core/use-cases/LoginUseCase";
import { SignupUseCase } from "../../../core/use-cases/SignupUseCase";
import { Request, Response } from "express";

export class AuthController {
  constructor(
    private signupUseCase: SignupUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        companyName,
        companyEmail,
        adminFirstName,
        adminLastName,
        adminEmail,
        password,
        agreeToTerms,
      } = req.body;
      if (
        !companyName ||
        !companyEmail ||
        !adminFirstName ||
        !adminLastName ||
        !adminEmail ||
        !password ||
        !agreeToTerms
      ) {
        res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "All fields are required",
          },
        });
        return;
      }

      const result = await this.signupUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("EMAIL_EXISTS")) {
          res.status(400).json({
            success: false,
            error: {
              code: "EMAIL_EXISTS",
              message: error.message.split(": ")[1],
            },
          });
          return;
        }

        res.status(500).json({
          success: false,
          error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong",
          },
        });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, rememberMe } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Email and Password are required",
          },
        });
        return;
      }

      const result = await this.loginUseCase.execute(req.body);

      const expiresAt = rememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.status(200).json({
        ...result,
        data: {
          ...result.data,
          expiresAt: expiresAt.toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("INVALID_CREDENTIALS")) {
          res.status(401).json({
            success: false,
            error: {
              code: "INVALID_CREDENTIALS",
              message: "Email or password is incorrect",
            },
          });
          return;
        }

        if (error.message.includes("COMPANY_NOT_FOUND")) {
          res.status(404).json({
            success: false,
            error: {
              code: "COMPANY_NOT_FOUND",
              message: "Associated company not found",
            },
          });
          return;
        }

        console.log(error);

        res.status(500).json({
          success: false,
          error: {
            code: "Internal Server Error",
            message: "Something went wrong",
          },
        });
      }
    }
  };
}
