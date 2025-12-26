import { Container } from "inversify";
import { Types } from "./types";
import { UserRepository } from "../database/repositories/UserRepository";
import { CompanyRepository } from "../database/repositories/CompanyRepository";
import { WorkspaceRepository } from "../database/repositories/WorkspaceRepository";
import { WorkspaceMemberRepository } from "../database/repositories/WorkspaceMemberRepository";
import { BcryptPasswordService } from "../services/BcryptPasswordService";
import { JwtTokenService } from "../services/JwtTokenService";
import {
  LoginUseCase,
  SignupUseCase,
  RefreshTokenUseCase,
  ForgotPasswordUseCase,
  ResetPasswordUseCase,
} from "../../core/use-cases/auth";
import { AuthController } from "../http/controllers/auth/AuthController";
import { WinstonService } from "../services/WinstonService";
import { ILogger } from "../../core/services/ILogger";
import { MongooseUnitOfWork } from "../uow/MongooseUnitOfWork";
import { InviteController } from "../http/controllers/invite/InviteController";
import {
  SendCompanyInviteUseCase,
  VerifyTokenUseCase,
  SendWorkspaceInviteUseCase,
  AcceptInviteUseCase,
} from "../../core/use-cases/invite";
import { PasswordResetRepository } from "../database/repositories/PasswordResetRepository";
import { NodemailerService } from "../services/NodemailerService";
import { InviteRepository } from "../database/repositories/InviteRepository";
import { SuperAdminLoginUseCase } from "../../core/use-cases/super-admin/SuperAdminLoginUseCase";
import { SuperAdminController } from "../http/controllers/super-admin/SuperAdminController";
import { GetAllCompaniesUseCase } from "../../core/use-cases/super-admin";

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
container.bind(Types.InviteRepository).to(InviteRepository).inSingletonScope();
container
  .bind(Types.PasswordResetRepository)
  .to(PasswordResetRepository)
  .inSingletonScope();

//UseCases
container.bind(Types.LoginUseCase).to(LoginUseCase);
container.bind(Types.SignupUseCase).to(SignupUseCase);
container.bind(Types.RefreshTokenUseCase).to(RefreshTokenUseCase);
container.bind(Types.SendCompanyInviteUseCase).to(SendCompanyInviteUseCase);
container.bind(Types.VerifyTokenUseCase).to(VerifyTokenUseCase);
container.bind(Types.AcceptInviteUseCase).to(AcceptInviteUseCase);
container.bind(Types.SendWorkspaceInviteUseCase).to(SendWorkspaceInviteUseCase);
container.bind(Types.ForgotPasswordUseCase).to(ForgotPasswordUseCase);
container.bind(Types.ResetPasswordUseCase).to(ResetPasswordUseCase);
container.bind(Types.SuperAdminLoginUseCase).to(SuperAdminLoginUseCase);
container.bind(Types.GetAllCompaniesUseCase).to(GetAllCompaniesUseCase);

//Services

container.bind(Types.TokenService).to(JwtTokenService).inSingletonScope();
container
  .bind(Types.PasswordService)
  .to(BcryptPasswordService)
  .inSingletonScope();
container.bind<ILogger>(Types.Logger).to(WinstonService).inSingletonScope();
container.bind(Types.EmailService).to(NodemailerService).inSingletonScope();

//Uow

container.bind(Types.UnitOfWork).to(MongooseUnitOfWork).inTransientScope();

//Controllers

container.bind(Types.AuthController).to(AuthController);
container.bind(Types.InviteController).to(InviteController);
container.bind(Types.SuperAdminController).to(SuperAdminController);
