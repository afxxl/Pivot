import { Container } from "inversify";
import { Types } from "./types";
import { UserRepository } from "../database/repositories/UserRepository";
import { CompanyRepository } from "../database/repositories/CompanyRepository";
import { WorkspaceRepository } from "../database/repositories/WorkspaceRepository";
import { WorkspaceMemberRepository } from "../database/repositories/WorkspaceMemberRepository";
import { BcryptPasswordService } from "../services/BcryptPasswordService";
import { JwtTokenService } from "../services/JwtTokenService";
import { LoginUseCase } from "../../core/use-cases/LoginUseCase";
import { SignupUseCase } from "../../core/use-cases/SignupUseCase";
import { RefreshTokenUseCase } from "../../core/use-cases/RefreshTokenUseCase";
import { AuthController } from "../http/controllers/AuthController";

export const container = new Container();

//Repositories
container.bind(Types.UserRepository).to(UserRepository);
container.bind(Types.CompanyRepository).to(CompanyRepository);
container.bind(Types.WorkspaceRepository).to(WorkspaceRepository);
container.bind(Types.WorkspaceMemberRepository).to(WorkspaceMemberRepository);

//UseCases
container.bind(Types.LoginUseCase).to(LoginUseCase);
container.bind(Types.SignupUseCase).to(SignupUseCase);
container.bind(Types.RefreshTokenUseCase).to(RefreshTokenUseCase);

//Services

container.bind(Types.TokenService).to(JwtTokenService);
container.bind(Types.PasswordService).to(BcryptPasswordService);

//Controllers

container.bind(Types.AuthController).to(AuthController);
