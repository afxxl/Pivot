import { superAdminApi } from "@/api/superAdmin.api";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Users,
  FolderKanban,
  TrendingUp,
  Mail,
  Globe,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  HardDrive,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const SuperAdminCompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["company", id],
    queryFn: () => superAdminApi.getCompany(id!),
    enabled: !!id,
  });
  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive",
      trial: "secondary",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  const getPlanBadge = (plan: string) => {
    const colors: Record<string, string> = {
      free: "bg-slate-100 text-slate-800",
      trial: "bg-gray-100 text-gray-800",
      starter: "bg-blue-100 text-blue-800",
      professional: "bg-purple-100 text-purple-800",
      enterprise: "bg-slate-800 text-white",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${colors[plan] || "bg-gray-100 text-gray-800"}`}
      >
        {plan.charAt(0).toUpperCase() + plan.slice(1)}
      </span>
    );
  };
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };
  const safeString = (value: any): string | null => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") return null;
    return String(value);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Loading company details...
          </p>
        </div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-destructive font-medium">Error loading company</p>
          <p className="text-sm text-muted-foreground mt-2">
            Company not found or an error occurred
          </p>
          <Button
            onClick={() => navigate("/super-admin/companies")}
            className="mt-4"
          >
            Back to Companies
          </Button>
        </div>
      </div>
    );
  }
  const company = data.data.company;
  const storagePercentage = (company.storageUsed / company.storageLimit) * 100;
  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/super-admin/companies">
            <Button variant="outline" size="sm" className="border-slate-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {company.name}
            </h1>
            <p className="text-slate-600 mt-1">Company Details & Analytics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(company.status)}
          {getPlanBadge(company.subscriptionPlan)}
        </div>
      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {company.totalUsers}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <span className="text-green-600 font-medium">
                {company.activeUsers}
              </span>
              active
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {company.totalProjects}
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <span className="text-green-600 font-medium">
                {company.activeProjects}
              </span>
              active
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Monthly Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ₹{company.monthlyRevenue.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-600 mt-1">Per month</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Storage Used
            </CardTitle>
            <HardDrive className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {storagePercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {formatBytes(company.storageUsed)} of
              {formatBytes(company.storageLimit)}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Company Information & Admin Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Email</p>
                <p className="text-sm text-slate-900">{company.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Subdomain</p>
                <p className="text-sm text-slate-900">
                  {company.subdomain}.pivot.app
                </p>
              </div>
            </div>
            {safeString(company.phone) && (
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Phone</p>
                  <p className="text-sm text-slate-900">
                    {safeString(company.phone)}
                  </p>
                </div>
              </div>
            )}
            {safeString(company.website) && (
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Website</p>
                  <a
                    href={safeString(company.website) || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {safeString(company.website)}
                  </a>
                </div>
              </div>
            )}
            {safeString(company.address) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-700">Address</p>
                  <p className="text-sm text-slate-900">
                    {safeString(company.address)}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">Created</p>
                <p className="text-sm text-slate-900">
                  {formatDate(company.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Last Active
                </p>
                <p className="text-sm text-slate-900">
                  {formatDate(company.lastActiveAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Admin Details */}
        <Card className="border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Company Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            {company.admin ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Name</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {company.admin.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Email</p>
                  <p className="text-sm text-slate-900">
                    {company.admin.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Last Login
                  </p>
                  <p className="text-sm text-slate-900">
                    {formatDate(company.admin.lastLogin)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No admin assigned</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Subscription & Billing */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription & Billing
          </CardTitle>
          <CardDescription className="text-slate-600">
            Subscription details and billing information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Subscription Status
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {company.subscriptionStatus || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Billing Cycle
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {company.billingCycle || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Monthly Revenue
              </p>
              <p className="text-lg font-semibold text-slate-900">
                ₹{company.billing.monthlyRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Subscription Start
              </p>
              <p className="text-sm text-slate-900">
                {formatDate(company.subscriptionStartDate)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Subscription End
              </p>
              <p className="text-sm text-slate-900">
                {formatDate(company.subscriptionEndDate)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Next Billing Date
              </p>
              <p className="text-sm text-slate-900">
                {formatDate(company.nextBillingDate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default SuperAdminCompanyDetails;
