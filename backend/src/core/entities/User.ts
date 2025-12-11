export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "workspace_admin" | "project_manager" | "member";
  status: "active" | "invited" | "inactive";
  companyId?: string;
  phone?: string;
  profile?: {
    avater?: string;
    bio?: string;
    location?: string;
    timezone?: string;
  };
  preferences?: {
    emailNotifications?: Boolean;
    pushNotifications?: Boolean;
    weeklySummary?: Boolean;
    theme?: String;
  };
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
