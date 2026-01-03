export const Types = {
  //Repositories
  UserRepository: "UserRepository",
  CompanyRepository: "CompanyRepository",
  InviteRepository: "InviteRepository",
  PasswordResetRepository: "PasswordResetRepository",
  SubscriptionPlanRepository: "SubscriptionPlanRepository",

  //Services
  PasswordService: "PasswordService",
  TokenService: "TokenService",
  Logger: "Logger",
  EmailService: "EmailService",

  //Uow (Unit of Work)
  UnitOfWork: "UnitOfWork",

  //Use Cases
  LoginUseCase: "LoginUseCase",
  SignupUseCase: "SignupUseCase",
  RefreshTokenUseCase: "RefreshTokenUseCase",
  SendCompanyInviteUseCase: "SendCompanyInviteUseCase",
  VerifyTokenUseCase: "VerifyTokenUseCase",
  AcceptInviteUseCase: "AcceptInviteUseCase",
  ForgotPasswordUseCase: "ForgotPasswordUseCase",
  ResetPasswordUseCase: "ResetPasswordUseCase",
  SuperAdminLoginUseCase: "SuperAdminLoginUseCase",
  GetAllCompaniesUseCase: "GetAllCompaniesUseCase",
  GetCompanyUseCase: "GetCompanyUseCase",
  GetAllSubscriptionPlansUseCase: "GetAllSubscriptionPlansUseCase",
  GetSubscriptionPlanByIdUseCase: "GetSubscriptionPlanByIdUseCase",
  CreateSubscriptionPlanUseCase: "CreateSubscriptionPlanUseCase",
  UpdateSubscriptionPlanUseCase: "UpdateSubscriptionPlanUseCase",
  DeleteSubscriptionPlanUseCase: "DeleteSubscriptionPlanUseCase",
  UpdateCompanySubscriptionUseCase: "UpdateCompanySubscriptionUseCase",

  //Controllers
  AuthController: "AuthController",
  InviteController: "InviteController",
  SuperAdminController: "SuperAdminController",
};
