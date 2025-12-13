import jwt from "jsonwebtoken";
import { ITokenService, TokenPayload } from "../../core/services/ITokenService";
import type { StringValue } from "ms";

export class JwtTokenService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: StringValue;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in environment variables. Please add it to your .env file.",
      );
    }

    if (!process.env.JWT_EXPIRES_IN) {
      throw new Error(
        "JWT_EXPIRES_IN is not defined in environment variables. Please add it to your .env file.",
      );
    }

    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN as StringValue;
  }

  generate(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}
