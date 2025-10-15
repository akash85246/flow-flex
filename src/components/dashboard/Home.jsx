import { useDispatch, useSelector } from "react-redux";
import {
  SquarePen,
  Search,
  Trash2,
  Plus,
  Image,
  Clock,
  FolderKanban,
  Users,
  BarChart3,
  Copy,
  CopyCheck,
  ChevronDown,
  ChevronUp,
  UserRoundMinus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateNewProject from "../../utils/organization/CreateNewProjectModal";
import { removeProject,setProjects } from "../../redux/slices/projectSlice";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchMemberTerm, setSearchMemberTerm] = useState("");
  const [memberRole, setMemberRole] = useState("all");
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [sort, setSort] = useState("all");
  const [sortMembers, setSortMembers] = useState("all");
  const [showInvites, setShowInvites] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [showInvitesDropdown, setShowInvitesDropdown] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const projects = useSelector((state) => state.projects.projects) || [];
  const [invitations, setInvitations] = useState([]);
  const [members, setMembers] = useState([]);

  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const organization = useSelector(
    (state) => state.organization.selectedOrganization
  );
  const [selectedRole, setSelectedRole] = useState(
    organization?.default_role || ""
  );
  const [formData, setFormData] = useState({
    logoPreview: `${Backend_URL}${organization?.logo}`,
    bannerPreview: `${Backend_URL}${organization?.banner}`,
  });
  const isOwner = organization?.role === "owner";
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const openCreateProjectModal = () => setIsCreateProjectModalOpen(true);
  const closeCreateProjectModal = () => setIsCreateProjectModalOpen(false);

  // Get organization members
  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/members`,
          {
            params: {
              orgId: organization?.id,
            },
            withCredentials: true,
          }
        );

        setMembers(response.data.members);
      };
      fetchRequests();
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  }, [dispatch, organization, Backend_URL]);

  // Get organization projects
  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const response = await axios.get(`${Backend_URL}/api/project`, {
          params: {
            org_id: organization?.id,
          },
          withCredentials: true,
        });
        dispatch(setProjects(response.data.projects));
      };
      fetchRequests();
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  }, [dispatch, organization, Backend_URL]);

  // Get organization requests
  useEffect(() => {
    try {
      const fetchRequests = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/owner-join-requests`,
          {
            params: {
              orgId: organization?.id,
            },
            withCredentials: true,
          }
        );
        setRequests(response.data.requests);
      };
      fetchRequests();
    } catch (error) {
      console.error("Error fetching requests data:", error);
    }
  }, [dispatch, organization, Backend_URL]);
  // Get organization invitations
  useEffect(() => {
    try {
      const fetchInvitation = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/all-invitations`,
          {
            params: {
              orgId: organization?.id,
            },
            withCredentials: true,
          }
        );

        setInvitations(response.data.invitations);
      };
      fetchInvitation();
    } catch (error) {
      console.error("Error fetching invitation data:", error);
    }
  }, [dispatch, organization, Backend_URL]);

  //Upload Logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, logoPreview: preview }));

    const form = new FormData();
    form.append("logo", file);
    form.append("org_id", organization.id);

    try {
      setIsUploadingLogo(true);
      const res = await axios.post(
        `${Backend_URL}/api/organization/update-logo`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("Logo upload failed:", error);
      alert("Logo upload failed. Try again.");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  //Upload Banner
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, bannerPreview: preview }));

    const form = new FormData();
    form.append("banner", file);
    form.append("org_id", organization.id);

    try {
      setIsUploadingBanner(true);
      const res = await axios.post(
        `${Backend_URL}/api/organization/update-banner`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.error("Banner upload failed:", error);
      alert("Banner upload failed. Try again.");
    } finally {
      setIsUploadingBanner(false);
    }
  };

  //remove member
  const handleRemoveMember = async (memberId) => {
    try {
      const response = await axios.delete(
        `${Backend_URL}/api/organization/remove-member`,
        {
          data: {
            orgId: organization.id,
            userIdToRemove: memberId,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== memberId)
        );
      }
    } catch (error) {
      console.error("Error removing member:", error.response?.data || error);
    }
  };

  // Invite member
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Backend_URL}/api/organization/invite`,
        {
          org_id: organization.id,
          role: selectedRole === "custom" ? customRole : selectedRole,
          email: e.target[1].value,
        },
        {
          withCredentials: true,
        }
      );

      alert("Invite sent successfully!");
      e.target.reset();
      setSelectedRole(organization?.default_role || "");
      setCustomRole("");
    } catch (error) {
      console.error("Error sending invite:", error);
    }
    e.target.reset();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(organization?.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  // Handle accept and reject requests
  const handleAccept = async (requestId) => {
    try {
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

const handleDeleteProject = async (projectId) => {
  try {
    const response = await axios.delete(
      `${Backend_URL}/api/project/delete`, 
      {
        data: { project_id: projectId },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      dispatch(removeProject(projectId));
    }
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

const onView = (projectId) => {
  navigate(`/project/${projectId}`);
}


  //   Project filtering logic
  let filteredProjects = [...projects];

  // Search by name
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filteredProjects = filteredProjects.filter((project) =>
      project.name?.toLowerCase().includes(term)
    );
  }

  // Sort logic
  if (sort === "asc") {
    filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "desc") {
    filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "newest") {
    filteredProjects.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sort === "older") {
    filteredProjects.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  //   Member filtering logic
  let filteredMembers = [...members];

  // Filter by role
  if (memberRole !== "all") {
    filteredMembers = filteredMembers.filter(
      (member) =>
        member.organization_role?.toLowerCase() === memberRole.toLowerCase()
    );
  }

  // Search by name or email
  if (searchMemberTerm.trim()) {
    const term = searchMemberTerm.toLowerCase();
    filteredMembers = filteredMembers.filter(
      (member) =>
        `${member.first_name} ${member.last_name}`
          .toLowerCase()
          .includes(term) || member.email?.toLowerCase().includes(term)
    );
  }

  // Sort logic
  switch (sort) {
    case "asc":
      filteredMembers.sort((a, b) => a.first_name.localeCompare(b.first_name));
      break;
    case "desc":
      filteredMembers.sort((a, b) => b.first_name.localeCompare(a.first_name));
      break;
    case "newest":
      filteredMembers.sort(
        (a, b) => new Date(b.joined_at) - new Date(a.joined_at)
      );
      break;
    case "older":
      filteredMembers.sort(
        (a, b) => new Date(a.joined_at) - new Date(b.joined_at)
      );
      break;
    default:
      break;
  }

  return (
    <section className="p-6 pl-28 grid grid-cols-3 gap-6 bg-gray-50">
      <div className="flex flex-col gap-6 col-span-2  overflow-y-auto ">
        <div className=" sticky top-0 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="relative h-40 w-full flex flex-col justify-end text-white">
              <img
                src={`${Backend_URL}${organization?.banner}`}
                alt="Organization Banner"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              {isOwner && (
                <label className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition shadow cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                  />
                  <SquarePen
                    className={`w-5 h-5 text-gray-700 ${
                      isUploadingBanner ? "animate-pulse text-gray-400" : ""
                    }`}
                  />
                </label>
              )}

              <div className="absolute bottom-3 left-48   flex flex-col">
                <h1 className="text-xl font-semibold drop-shadow-md">
                  {organization?.name}
                </h1>
                {organization?.website && (
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/90 hover:text-white underline-offset-2 hover:underline transition z-50"
                  >
                    {organization.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>

            <div className="relative flex items-start px-6 pb-6 -mt-20">
              {/* Logo */}
              <div className="relative group">
                <img
                  src={`${Backend_URL}${organization?.logo}`}
                  alt="Organization Logo"
                  className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
                {isOwner && (
                  <label className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <SquarePen
                      className={`w-6 h-6 text-gray-700 ${
                        isUploadingLogo ? "animate-pulse text-gray-400" : ""
                      }`}
                    />
                  </label>
                )}
              </div>

              {/* Description */}
              <div className="flex-1 ml-6 mt-20 text-gray-700">
                {organization?.description ? (
                  <p className="text-sm leading-relaxed text-gray-600rounded-lg py-2 ">
                    {organization.description}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No description added yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
              <h2 className="font-semibold text-gray-800">Your Projects</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-2 top-2.5 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search Projects"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
                  />
                </div>

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

            {/* projects */}
            <div className="space-y-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border border-gray-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                   
                  >
                    {/* Left section */}
                    <div className="flex items-center gap-4" onClick={()=>onView(project.id)}>
                      {/* Project Banner */}
                      {project.banner_url ? (
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}${project.banner_url}`}
                          alt={project.name}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
                          <Image className="text-gray-400 w-6 h-6" />
                        </div>
                      )}

                      {/* Project Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                          {project.description || "No description available."}
                        </p>

                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {new Date(project.created_at).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FolderKanban className="w-4 h-4 text-gray-400" />
                            {project.total_boards ?? 0} Boards
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            {project.total_members ?? 0} Members
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                            {project.progress ?? 0}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right section - Actions */}
                    <div className="flex items-center gap-3">
                      

                      <button
                        onClick={()=>handleDeleteProject(project.id) }
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No Projects found.
                </p>
              )}
            </div>
          </div>
          {/* Organization Members */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
              <h2 className="font-semibold text-gray-800">
                Organization Members
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-2 top-2.5 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search Members"
                    value={searchMemberTerm}
                    onChange={(e) => setSearchMemberTerm(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
                  />
                </div>

                {/* sort filter */}
                <select
                  value={sortMembers}
                  onChange={(e) => setSortMembers(e.target.value)}
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
                {/* role filter */}
                <select
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae]"
                >
                  <option value="all" disabled>
                    Filter by Role
                  </option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="manager">Manager</option>
                  <option value="developer">Developer</option>
                </select>
              </div>
            </div>

            {/* members */}
            <ul className="space-y-1">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => {
                  const avatarUrl = member.avatar?.startsWith("http")
                    ? member.avatar
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        member.avatar || "default-avatar.png"
                      }`;

                  const isOnline = member.status === "online";

                  return (
                    <li
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {/* Left side: Avatar + Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative">
                          <img
                            src={avatarUrl}
                            alt={`${member.first_name} ${member.last_name}`}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <span
                            className={`w-4 h-4 absolute -top-1 -left-1 rounded-full  ${
                              isOnline ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>
                        </div>
                        <div className="truncate flex flex-col justify-between gap-1">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            <span>
                              {member.first_name} {member.last_name}
                            </span>
                            <span className="font-extralight text-[#38a8ae] text-xs ml-2">
                              {member.organization_role || "Member"}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {member.email}
                          </p>
                        </div>
                      </div>

                      {/* Right side: Status + Joined + Delete */}
                      <div className="flex items-center gap-3 shrink-0 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500">
                            {new Date(member.joined_at).toLocaleDateString()}
                          </span>
                          {/* Delete Button */}
                          {member.organization_role === "owner" ? (
                            ""
                          ) : (
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="ml-2 p-1.5 text-fourth  hover:text-red-500  rounded-full transition"
                              title="Remove Member"
                            >
                              <UserRoundMinus />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No members found.
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6  overflow-y-auto">
        {/* button section */}
        <div className="flex justify-end gap-3 relative">
          <button
            className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm flex items-center gap-2"
            onClick={openCreateProjectModal}
          >
            <Plus size={18} />
            New Project
          </button>
        </div>

        {/* Invite Member Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Invite Members
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Share a join code or send an invite link to add new members to your
            organization.
          </p>

          {/* Join Code Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Join Code
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Share this code with members so they can join directly.
            </p>

            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-inner">
              <input
                value={organization?.code || ""}
                readOnly
                className="w-full rounded-md px-3 py-2 text-sm font-mono tracking-widest focus:outline-none transition-all"
              />
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 transition text-gray-600"
                onClick={() => handleCopy()}
              >
                {!isCopied ? (
                  <Copy className="w-4 h-4 text-primary" />
                ) : (
                  <CopyCheck className="w-4 h-4 text-green-700" />
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Share Link Section */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Send Invite Link
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Invite someone directly by email and assign a role.
            </p>
          </div>

          <form onSubmit={handleInviteSubmit} className="space-y-3">
            <div className="flex flex-col space-y-3">
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

              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 border border-gray-200 bg-gray-50 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>

        {/* Requests */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 mb-3">
              Access Requests
            </h2>
            <button
              onClick={() => setShowRequests(!showRequests)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition"
            >
              {!showRequests ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>

          {/* Animated List */}
          <AnimatePresence initial={false}>
            {showRequests && (
              <motion.ul
                className="text-sm text-gray-600 space-y-2 max-h-60 overflow-y-auto"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {requests.map((req) => {
                  const avatarUrl = req.avatar?.startsWith("http")
                    ? req.avatar
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        req.avatar
                      }`;

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
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Invites */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 mb-3">
              Recent Invitations
            </h2>
            <button
              onClick={() => setShowInvites(!showInvites)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition"
            >
              {!showInvites ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>

          {/* Animated List */}
          <AnimatePresence initial={false}>
            {showInvites && (
              <motion.ul
                className="text-sm text-gray-600 space-y-2 max-h-60 overflow-y-auto pr-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {invitations.map((invite) => {
                  const inviterAvatar = invite.inviter_avatar?.startsWith(
                    "http"
                  )
                    ? invite.inviter_avatar
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        invite.inviter_avatar || "default-avatar.png"
                      }`;

                  const inviteeAvatar = invite.invitee_avatar
                    ? invite.invitee_avatar.startsWith("http")
                      ? invite.invitee_avatar
                      : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                          invite.invitee_avatar
                        }`
                    : "/default-user.png"; // fallback avatar

                  const isExpired = new Date(invite.expires_at) < new Date();

                  return (
                    <li
                      key={invite.invitation_id}
                      className="flex items-center justify-between gap-3 p-2 border-b border-gray-200"
                    >
                      {/* Left side — Invitee */}
                      <div className="flex items-center gap-3 min-w-0">
                        {invite.invitee_avatar && (
                          <img
                            src={inviteeAvatar}
                            alt={
                              invite.invitee_firstname || invite.invitee_email
                            }
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                        )}
                        <div className="truncate">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {invite.invitee_firstname
                              ? `${invite.invitee_firstname} ${invite.invitee_lastname}`
                              : invite.invitee_email}
                          </p>
                          <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                            {invite.invited_role} by
                            <a
                              href={invite.inviter_slug}
                              className="cursor-pointer hover:underline flex items-center gap-1"
                            >
                              {" "}
                              <img
                                src={inviterAvatar}
                                alt={invite.inviter_firstname}
                                className="w-4 h-4 rounded-full object-cover border"
                                title={`${invite.inviter_firstname} ${invite.inviter_lastname}`}
                              />
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Right side — Status + Inviter */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 text-[11px] font-medium rounded-full ${
                            invite.invitation_used
                              ? "bg-green-100 text-green-700"
                              : isExpired
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {invite.invitation_used
                            ? "Accepted"
                            : isExpired
                            ? "Expired"
                            : "Pending"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-800 mb-3">
              Recent Activities
            </h2>
            <button
              onClick={() => setShowActivities(!showActivities)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition"
            >
              {!showActivities ? <ChevronDown /> : <ChevronUp />}
            </button>
          </div>

          {/* Animated List */}
          <AnimatePresence initial={false}>
            {showActivities && (
              <motion.ul
                className="text-sm text-gray-600 space-y-2 max-h-60 overflow-y-auto pr-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <li>hell baby</li>
                <li>hell baby</li>
                <li>hell baby</li>
                <li>hell baby</li>
                <li>hell baby</li>
                {requests.map((req) => (
                  <li
                    key={req.request_id}
                    className="flex items-center justify-between gap-3 p-2 border-b border-gray-200 rounded-md bg-white shadow-sm"
                  >
                    <span>{req.organization_name}</span>
                    <span>
                      {req.first_name} {req.last_name}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <CreateNewProject
        isOpen={isCreateProjectModalOpen}
        onClose={closeCreateProjectModal}
      />
    </section>
  );
}
