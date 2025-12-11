export interface SignupRequestDTO {
  companyName: string;
  companyEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  password: string;
  agreeToTerms: boolean;
}

export interface SignupResponseDTO {
  success: boolean;
  message: string;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      status: string;
      subscriptionPlan: string;
      createdAt: string;
    };
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      status: string;
    };
    token: string;
    redirectTo: string;
  };
}
