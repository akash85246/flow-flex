import { Plus, Search, Filter, Users, BarChart3, MailPlus } from "lucide-react";
import CreateOrganizationModal from "./CreateOrganizationModal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Organizations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const organizations =
    useSelector((state) => state.organizations.Organizations) || [];

  const filteredOrgs = organizations
    .filter((org) => org.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((org) => (filterRole === "all" ? true : org.role === filterRole));

  const onSendInvite = async (e) => {
    e.preventDefault();
    // Handle sending invite logic here
    console.log("Invite sent to organization ID:", selectedOrg);
    console.log(
      "Role assigned:",
      selectedRole === "custom" ? customRole : selectedRole
    );
    console.log("email:", e.target[2].value);

    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(
        `${Backend_URL}/api/organization/invite`,
        {
          org_id: selectedOrg,
          role: selectedRole === "custom" ? customRole : selectedRole,
          email: e.target[2].value,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Invite response:", response.data);
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  return (
    <section className="p-6 pl-28 grid grid-cols-3 gap-6 bg-gray-50 ">
      {/* Header Section */}
      <div className="col-span-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Organizations
          </h1>
          <p className="text-gray-500 text-sm">
            Create, join, manage, and explore your connected organizations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2">
            <MailPlus size={18} />
            Invites
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm flex items-center gap-2"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>
      </div>

      {/* Left Column - Organization Tools */}
      <div className="col-span-2 flex flex-col gap-6">
        {/* Join via code */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            Invite a Contact
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Send an invite link to someone you'd like to collaborate with in
            your organization.
          </p>

          <form className="space-y-4" onSubmit={onSendInvite}>
            {/* Select Organization */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Select Organization
              </label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae] bg-white"
                value={selectedOrg}
                onChange={(e) => {
                  const orgId = Number(e.target.value);
                  setSelectedOrg(orgId);

                  const org = organizations.find((o) => o.id === orgId);
                  console.log("Selected Org ID:", orgId, org);
                  setSelectedRole(org.default_role || "");
                }}
              >
                <option value="" disabled>
                  Choose an organization
                </option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Select Role
              </label>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae] bg-white w-1/2"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" disabled>
                    Choose a role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="member">Member</option>
                  <option value="custom">Custom...</option>
                </select>

                {/* Show this input only when 'Custom' is selected */}
                {selectedRole === "custom" && (
                  <input
                    type="text"
                    placeholder="Enter custom role"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae] w-1/2"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                  />
                )}
              </div>
            </div>
            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Invitee Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#38a8ae] text-white py-2 rounded-lg hover:bg-[#2c8b90] transition-all text-sm font-medium shadow-sm"
            >
              Send Invitation
            </button>
          </form>
        </div>

        {/* Your Organizations */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
            <h2 className="font-semibold text-gray-800">Your Organizations</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-2 top-2.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search organizations"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
              >
                <option value="all">All Roles</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>

              {/* sort filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
              >
                <option value="all">Sort By</option>
                <option value="owner">A-Z</option>
                <option value="admin">Z-A</option>
                <option value="member">Newest</option>
                <option value="member">Oldest</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrgs.length > 0 ? (
              filteredOrgs.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between border border-gray-100 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">{org.name}</h3>
                    <p className="text-xs text-gray-500">
                      Role: {org.role} • {org.members_count} members •{" "}
                      {org.projects_count} projects
                    </p>
                  </div>
                  <button className="text-[#38a8ae] text-sm font-medium hover:underline">
                    View
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No organizations found.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col gap-6">
        {/* Invite Known Contact */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-2">Join via Code</h2>
          <p className="text-sm text-gray-500 mb-3">
            Enter a valid organization code to request access.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter organization code"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
            />
            <button className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm">
              Join
            </button>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3">Access Requests</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You joined{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You invited{" "}
            </li>
          </ul>
        </div>
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3">
            Recent Activities
          </h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You joined{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You created{" "}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-[#38a8ae]" /> You invited{" "}
            </li>
          </ul>
        </div>
      </div>
      <CreateOrganizationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </section>
  );
}
