import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserPlus, Users as UsersIcon } from "lucide-react";

const TeamMembers = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
            <p className="text-gray-600 mt-1">
              Manage your team and send invitations
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/members/invite")}
            className="bg-gradient-to-r from-[#562182] to-purple-700 hover:from-purple-700 hover:to-[#562182] shadow-lg shadow-purple-200"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
              <UsersIcon className="h-10 w-10 text-[#562182]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Team Management Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mb-6">
              View and manage your team members, track their roles, and monitor
              activity. For now, you can invite new members to join your team.
            </p>
            <Button
              onClick={() => navigate("/admin/members/invite")}
              variant="outline"
              className="border-[#562182] text-[#562182] hover:bg-purple-50"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Your First Member
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamMembers;
