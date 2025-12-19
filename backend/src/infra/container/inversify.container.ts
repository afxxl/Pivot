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
import { WinstonService } from "../services/WinstonService";
import { ILogger } from "../../core/services/ILogger";
import { MongooseUnitOfWork } from "../uow/MongooseUnitOfWork";

export const container = new Container();

//Repositories
container.bind(Types.UserRepository).to(UserRepository).inSingletonScope();
container
  .bind(Types.CompanyRepository)
  .to(CompanyRepository)
  .inSingletonScope();
container
  .bind(Types.WorkspaceRepository)
  .to(WorkspaceRepository)
  .inSingletonScope();
container
  .bind(Types.WorkspaceMemberRepository)
  .to(WorkspaceMemberRepository)
  .inSingletonScope();

//UseCases
container.bind(Types.LoginUseCase).to(LoginUseCase);
container.bind(Types.SignupUseCase).to(SignupUseCase);
container.bind(Types.RefreshTokenUseCase).to(RefreshTokenUseCase);

//Services

container.bind(Types.TokenService).to(JwtTokenService).inSingletonScope();
container
  .bind(Types.PasswordService)
  .to(BcryptPasswordService)
  .inSingletonScope();
container.bind<ILogger>(Types.Logger).to(WinstonService).inSingletonScope();

//Uow

container.bind(Types.UnitOfWork).to(MongooseUnitOfWork).inTransientScope();

//Controllers

container.bind(Types.AuthController).to(AuthController);
