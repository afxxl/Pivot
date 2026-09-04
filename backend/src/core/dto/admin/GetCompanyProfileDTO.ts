export interface GetCompanyProfileResponseDTO {
  success: boolean;
  data: {
    company: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      website: string | null;
      logo: string | null;
      status: string;
      plan: string;
      planDetails: {
        name: string;
        maxUsers: number;
        maxProjects: number;
        usedUsers: number;
        usedProjects: number;
      };
      createdAt: string;
    };
  };
}
