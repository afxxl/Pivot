export interface LoginRequestDTO {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponseDTO {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      status: string;
      company: {
        id: string;
        name: string;
      };
      workspaces?: Array<{
        id: string;
        name: string;
      }>;
    };
  };
  token: string;
  redirectTo: string;
}
