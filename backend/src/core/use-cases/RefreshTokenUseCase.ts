import {
  TokenExpiredError,
  UnauthorizedError,
} from "../../shared/errors/AuthError";
import {
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from "../dto/RefreshTokenDTO";
import { IUserRepository } from "../repositories/IUserRepository";
import { ITokenService } from "../services/ITokenService";

import { Types } from "../../infra/container/types";
import { inject, injectable } from "inversify";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(Types.TokenService)
    private tokenService: ITokenService,

    @inject(Types.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async execute(req: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    const decoded = this.tokenService.verifyRefreshToken(req.refreshToken);

    if (!decoded) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const user = await this.userRepository.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    if (user.status !== "active") {
      throw new UnauthorizedError("User account is not active");
    }

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken,
        expiresIn: 15 * 60,
        tokenType: "Bearer",
      },
    };
  }
}
