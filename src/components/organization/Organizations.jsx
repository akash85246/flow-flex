import { Plus, Search, Filter, Users, BarChart3, MailPlus } from "lucide-react";
import CreateOrganizationModal from "../../utils/organization/CreateOrganizationModal";
import InvitesDropDown from "../../utils/organization/InvitesDropDown";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { setInvitation } from "../../redux/slices/invitationSlice";
import { useNavigate } from "react-router-dom";

export default function Organizations() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInvites, setShowInvites] = useState(false);
  const [requests, setRequests] = useState([]);

  const invitations = useSelector((state) => state.invitation.invitation);
  const organizations =
    useSelector((state) => state.organizations.Organizations) || [];

  useEffect(() => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const fetchInvitation = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/user-invitations`,
          {
            withCredentials: true,
          }
        );
        dispatch(setInvitation(response.data.invitations));
      };

      fetchInvitation();
    } catch (error) {
      console.error("Error fetching invitation data:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const fetchRequests = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/owner-join-requests`,
          {
            withCredentials: true,
          }
        );
        setRequests(response.data.requests);
      };
      fetchRequests();
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  }, []);

  let filteredOrganizations = [...organizations];

  // Filter by role
  if (filterRole !== "all") {
    filteredOrganizations = filteredOrganizations.filter(
      (org) => org.role?.toLowerCase() === filterRole.toLowerCase()
    );
  }

  // Search by name
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredOrganizations = filteredOrganizations.filter((org) =>
      org.name?.toLowerCase().includes(term)
    );
  }

  // Sort logic
  if (sort === "asc") {
    filteredOrganizations.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "desc") {
    filteredOrganizations.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "newest") {
    filteredOrganizations.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sort === "older") {
    filteredOrganizations.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }
  const onSendInvite = async (e) => {
    e.preventDefault();
    // Handle sending invite logic here
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

      alert("Invite sent successfully!");
      e.target.reset();
      setSelectedOrg("");
      setSelectedRole("");
      setCustomRole("");
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    // Handle sending invite logic here
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(
        `${Backend_URL}/api/organization/request-access`,
        {
          orgCode: e.target[0].value,
        },
        {
          withCredentials: true,
        }
      );
      alert("Request sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(
        `${Backend_URL}/api/organization/accept-request`,
        {
          requestId: requestId,
        },
        {
          withCredentials: true,
        }
      );

      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.request_id !== requestId)
      );
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(
        `${Backend_URL}/api/organization/reject-request`,
        {
          requestId: requestId,
        },
        { withCredentials: true }
      );
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.request_id !== requestId)
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
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
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setShowInvites(!showInvites)}
            className="relative border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"
          >
            <MailPlus size={20} />
            <span className="font-medium">Invites</span>
            {invitations.length > 0 && (
              <span className="absolute -right-1 top-1/2  bg-[#38a8ae] text-white font-extralight px-2 py-0.5 rounded-full text-xs">
                {invitations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm flex items-center gap-2"
          >
            <Plus size={18} />
            Create New
          </button>

          <InvitesDropDown
            showInvites={showInvites}
            setShowInvites={setShowInvites}
          />
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
                  <option value="lead">Team Leader</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="tester">Tester</option>
                  <option value="analyst">Analyst</option>
                  <option value="intern">Intern</option>
                  <option value="contributor">Contributor</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="support">Support Staff</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="guest">Guest</option>
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
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
              >
                <option value="all" disabled>
                  Sort By
                </option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="newest">Newest</option>
                <option value="older">Oldest</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrganizations.length > 0 ? (
              filteredOrganizations.map((org) => (
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
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => sendRequest(e)}
          >
            <input
              type="text"
              placeholder="Enter organization code"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
            />
            <button
              type="submit"
              className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm"
            >
              Join
            </button>
          </form>
        </div>

        {/* Requests */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-3">Access Requests</h2>
          <ul className="text-sm text-gray-600 space-y-2 max-h-60 overflow-y-auto pr-2">
            {requests.map((req) => {
              const avatarUrl = req.avatar?.startsWith("http")
                ? req.avatar
                : `${import.meta.env.VITE_BACKEND_URL}/uploads/${req.avatar}`;

              return (
                <li
                  key={req.request_id}
                  className="flex items-center justify-between gap-3 p-2 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      alt={`${req.first_name} ${req.last_name}`}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <span className="text-sm text-gray-700">
                      <a
                        href={`/user/${req.slug}`}
                        className="font-medium text-[#38a8ae] hover:underline"
                      >
                        {req.first_name} {req.last_name}
                      </a>{" "}
                      requested to join{" "}
                      <span className="font-semibold">
                        {req.organization_name}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-1.5 text-gray-300 hover:text-red-500 rounded-full transition"
                      onClick={() => handleReject(req.request_id)}
                    >
                      ✕
                    </button>
                    <button
                      className="p-1.5 text-gray-500 hover:text-green-500 rounded-full transition"
                      onClick={() => handleAccept(req.request_id)}
                    >
                      ✓
                    </button>
                  </div>
                </li>
              );
            })}
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
