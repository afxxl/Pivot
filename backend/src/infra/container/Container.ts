import { LoginUseCase } from "../../core/use-cases/LoginUseCase";
import { SignupUseCase } from "../../core/use-cases/SignupUseCase";
import { RefreshTokenUseCase } from "../../core/use-cases/RefreshTokenUseCase";
import { CompanyRepository } from "../database/repositories/CompanyRepository";
import { UserRepository } from "../database/repositories/UserRepository";
import { WorkspaceMemberRepository } from "../database/repositories/WorkspaceMemberRepository";
import { WorkspaceRepository } from "../database/repositories/WorkspaceRepository";
import { AuthController } from "../http/controllers/AuthController";
import { BcryptPasswordService } from "../services/BcryptPasswordService";
import { JwtTokenService } from "../services/JwtTokenService";

class Container {
  // REPOSITORIES
  private _userRepository?: UserRepository;
  private _companyRepository?: CompanyRepository;
  private _workspaceRepository?: WorkspaceRepository;
  private _workspaceMemberRepository?: WorkspaceMemberRepository;

  // SERVICES
  private _passwordService?: BcryptPasswordService;
  private _tokenService?: JwtTokenService;

  // USE CASES
  private _signupUseCase?: SignupUseCase;
  private _loginUseCase?: LoginUseCase;
  private _refreshTokenUseCase?: RefreshTokenUseCase;

  // CONTROLLERS
  private _authController?: AuthController;

  // REPOSITORY GETTERS
  get userRepository(): UserRepository {
    if (!this._userRepository) {
      this._userRepository = new UserRepository();
    }
    return this._userRepository;
  }

  get companyRepository(): CompanyRepository {
    if (!this._companyRepository) {
      this._companyRepository = new CompanyRepository();
    }
    return this._companyRepository;
  }

  get workspaceRepository(): WorkspaceRepository {
    if (!this._workspaceRepository) {
      this._workspaceRepository = new WorkspaceRepository();
    }
    return this._workspaceRepository;
  }

  get workspaceMemberRepository(): WorkspaceMemberRepository {
    if (!this._workspaceMemberRepository) {
      this._workspaceMemberRepository = new WorkspaceMemberRepository();
    }
    return this._workspaceMemberRepository;
  }

  // SERVICE GETTERS
  get passwordService(): BcryptPasswordService {
    if (!this._passwordService) {
      this._passwordService = new BcryptPasswordService();
    }
    return this._passwordService;
  }

  get tokenService(): JwtTokenService {
    if (!this._tokenService) {
      this._tokenService = new JwtTokenService();
    }
    return this._tokenService;
  }

  // USE CASE GETTERS
  get signupUseCase(): SignupUseCase {
    if (!this._signupUseCase) {
      this._signupUseCase = new SignupUseCase(
        this.userRepository,
        this.companyRepository,
        this.passwordService,
        this.tokenService,
      );
    }
    return this._signupUseCase;
  }

  get loginUseCase(): LoginUseCase {
    if (!this._loginUseCase) {
      this._loginUseCase = new LoginUseCase(
        this.userRepository,
        this.companyRepository,
        this.workspaceRepository,
        this.passwordService,
        this.tokenService,
      );
    }
    return this._loginUseCase;
  }

  get refreshTokenUseCase(): RefreshTokenUseCase {
    if (!this._refreshTokenUseCase) {
      this._refreshTokenUseCase = new RefreshTokenUseCase(
        this.tokenService,
        this.userRepository,
      );
    }
    return this._refreshTokenUseCase;
  }

  // CONTROLLER GETTERS
  get authController(): AuthController {
    if (!this._authController) {
      this._authController = new AuthController(
        this.signupUseCase,
        this.loginUseCase,
        this.refreshTokenUseCase,
      );
    }
    return this._authController;
  }
}

export const container = new Container();
