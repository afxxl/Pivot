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
import {
  CreateSubscriptionPlanUseCase,
  DeleteSubscriptionPlanUseCase,
  GetAllCompaniesUseCase,
  GetAllSubscriptionPlansUseCase,
  GetSubscriptionPlanByIdUseCase,
  UpdateSubscriptionPlanUseCase,
} from "../../core/use-cases/super-admin";
import { GetCompanyUseCase } from "../../core/use-cases/super-admin/GetCompanyUseCase";
import { SubscriptionPlanRepository } from "../database/repositories/SubscriptionPlanRepository";
import { UpdateCompanySubscriptionUseCase } from "../../core/use-cases/super-admin/UpdateCompanySubscriptionUseCase";

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
container
  .bind(Types.SubscriptionPlanRepository)
  .to(SubscriptionPlanRepository)
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
container.bind(Types.GetCompanyUseCase).to(GetCompanyUseCase);
container
  .bind(Types.GetAllSubscriptionPlansUseCase)
  .to(GetAllSubscriptionPlansUseCase);
container
  .bind(Types.GetSubscriptionPlanByIdUseCase)
  .to(GetSubscriptionPlanByIdUseCase);
container
  .bind(Types.CreateSubscriptionPlanUseCase)
  .to(CreateSubscriptionPlanUseCase);
container
  .bind(Types.UpdateSubscriptionPlanUseCase)
  .to(UpdateSubscriptionPlanUseCase);
container
  .bind(Types.DeleteSubscriptionPlanUseCase)
  .to(DeleteSubscriptionPlanUseCase);
container
  .bind(Types.UpdateCompanySubscriptionUseCase)
  .to(UpdateCompanySubscriptionUseCase);

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
