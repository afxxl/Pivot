import { SignupUseCase } from "../../../core/use-cases/SignupUseCase";
import { Request, Response } from "express";

export class AuthController {
  constructor(private signupUseCase: SignupUseCase) {}

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
}
