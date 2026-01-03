export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "admin" | "member";
  status: "active" | "invited" | "inactive";
  companyId: string;
  phone?: string;
  profile?: {
    avatar?: string;
    bio?: string;
    location?: string;
    timezone?: string;
  };
  preferences?: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    weeklySummary?: boolean;
    theme?: string;
  };
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
