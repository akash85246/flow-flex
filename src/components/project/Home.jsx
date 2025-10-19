import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSelectedProject } from "../../redux/slices/projectSlice";
import { setBoards } from "../../redux/slices/BoardsSlice";
import {
  SquarePen,
  Star,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateNewProject from "../../utils/project/CreateNewBoardModal";
export default function Home() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = useSelector((state) => state.projects.selectedProject);
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [showActivities, setShowActivities] = useState(true);
  const [searchMemberTerm, setSearchMemberTerm] = useState("");
  const boards = useSelector((state) => state.boards.boards);
  const [activity, setActivity] = useState([
    // Example activity data; in real app, fetch from backend
    {
      request_id: 1,
      organization_name: "Org A",
      first_name: "John",
      last_name: "Doe",
    },
    {
      request_id: 2,
      organization_name: "Org B",
      first_name: "Jane",
      last_name: "Smith",
    },
    {
      request_id: 3,
      organization_name: "Org C",
      first_name: "Alice",
      last_name: "Johnson",
    },
    {
      request_id: 4,
      organization_name: "Org D",
      first_name: "Bob",
      last_name: "Brown",
    },
    {
      request_id: 5,
      organization_name: "Org E",
      first_name: "Charlie",
      last_name: "Davis",
    },
  ]);
  // Example organization members; in real app, fetch from backend
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [memberRole, setMemberRole] = useState("all");
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [textColor, setTextColor] = useState("text-white");
  const [formData, setFormData] = useState({
    bannerPreview: "",
  });

  useEffect(() => {
    if (project?.banner_url) {
      setFormData({
        bannerPreview: `${Backend_URL}${project.banner_url}`,
      });
    }
  }, [project, Backend_URL]);

  // determine background is dark or light
  useEffect(() => {
    if (!project?.banner_url) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `${Backend_URL}${project.banner_url}`;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;
      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < imageData.length; i += 10) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }

      const avgBrightness = (r + g + b) / ((imageData.length / 4) * 3);
      if (avgBrightness < 100) {
        setTextColor("text-white");
      } else {
        setTextColor("text-black");
      }
    };
  }, [project, Backend_URL]);

  // Fetch Project Details
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/api/project/details`, {
          params: { slug },
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("Fetched project details:", response.data.project);
          dispatch(setSelectedProject(response.data.project));
        } else {
          console.error(" Failed to fetch project details");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [dispatch, Backend_URL, slug]);

  // Fetch Project Members
  useEffect(() => {
    const fetchProjectMemberDetails = async () => {
      try {
        const response = await axios.get(
          `${Backend_URL}/api/project/project-users`,
          {
            params: { projectId: project?.id, orgId: project?.org_id },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Fetched project members:", response.data.users);
          setOrganizationMembers(response.data.users);
        } else {
          console.error(" Failed to fetch project membes");
        }
      } catch (error) {
        console.error("Error fetching project member details:", error);
      }
    };
    if (project?.id !== undefined) {
      fetchProjectMemberDetails();
    }
  }, [dispatch, Backend_URL, slug, project]);

  // Handle banner upload
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, bannerPreview: preview }));

    const form = new FormData();
    form.append("banner", file);
    form.append("project_id", project.id);
    try {
      setIsUploadingBanner(true);
      const res = await axios.post(
        `${Backend_URL}/api/project/update-banner`,
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

  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
  };

  const openCreateBoardModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const addMemberToProject = async (member) => {
    try {
      const payload = {
        user_id: member.id,
        project_id: project.id,
        role: member.org_role || "member",
      };

      console.log("Adding member with payload:", payload);

      const response = await axios.post(
        `${Backend_URL}/api/project/add-member`,
        payload,
        { withCredentials: true }
      );

      if (response.status === 200 || response.data.success) {
        setOrganizationMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === member
              ? { ...member, project_member: true }
              : member
          )
        );
      } else {
        console.warn("Unexpected response while adding member:", response);
      }
    } catch (error) {
      console.error("Failed to add member:", error);
    }
  };

  const closeCreateProjectModal = () => {
    setIsCreateProjectModalOpen(false);
  };

  useEffect(() => {
    const getBoards = async () => {
      try {
        const response = await axios.get(
          `${Backend_URL}/api/board/project-boards`,
          {
            params: { project_id: project.id },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Fetched boards:", response.data.boards);
          return response.data.boards;
        } else {
          console.error("Failed to fetch project boards");
          return [];
        }
      } catch (error) {
        console.error("Error fetching project boards:", error);
        return [];
      }
    };

    if (project?.id !== undefined) {
      (async () => {
        const boards = await getBoards();
        dispatch(setBoards(boards));
      })();
    }
  }, [Backend_URL, project, dispatch]);

  //filter member
  let filteredMembers = [...organizationMembers];

  // Filter by role
  if (memberRole !== "all") {
    filteredMembers = filteredMembers.filter(
      (member) => member.org_role?.toLowerCase() === memberRole.toLowerCase()
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

  return (
    <section className="p-6 pl-28 grid grid-cols-3 gap-6 bg-gray-50 min-h-screen">
      {/* Left content area */}
      <div className="col-span-2 overflow-y-auto">
        {/* Project Banner */}
        <div
          className="relative rounded-xl overflow-hidden mb-6 h-64 bg-cover bg-center shadow-md"
          style={{
            backgroundImage: `url(${formData.bannerPreview})`,
          }}
        >
          {/* Project Title */}
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/50 via-black/20 to-transparent w-full flex items-center justify-between">
            <h2
              className={`text-4xl font-bold transition-colors duration-300 ${textColor}`}
            >
              {project?.name}
            </h2>
            <button onClick={handleFavoriteClick}>
              {isFavorited ? (
                <Star className="w-8 h-8 text-yellow-400 animate-pulse fill-yellow-400" />
              ) : (
                <Star
                  className={`w-8 h-8 ${textColor} hover:text-yellow-400 transition cursor-pointer`}
                />
              )}
            </button>
          </div>

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
        </div>

        {/* Other project content */}
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <p className="text-xs text-gray-500 text-right">
            {new Date(project?.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600">
            {project?.description || "No description provided."}
          </p>
          <div className="mt-4">
            {project?.archived ? (
              <span className="inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                Archived
              </span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>
        {/* Recent Boards */}
        <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold mb-2">Recent Boards</h3>
          {boards.length === 0 ? (
            <p className="text-gray-400 text-sm">No boards available.</p>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
              {boards.slice(0, 5).map((board) => (
                <li
                  onClick={() => navigate(`/board/${board.slug}`)}
                  key={board.id}
                  className="flex flex-col gap-3 rounded-lg overflow-hidden bg-white dark:bg-background-dark shadow-sm border border-primary/20 dark:border-primary/30"
                >
                  <div className="relative w-full aspect-video overflow-hidden rounded-lg group">
                    <div
                      className="w-full h-full bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${Backend_URL}${
                          board.banner_url || "/default-bg.jpg"
                        })`,
                      }}
                    ></div>

                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>

                    {/* Star icon */}
                    <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {board?.isFavorited ? (
                        <Star className="w-6 h-6 text-yellow-400 animate-pulse fill-yellow-400" />
                      ) : (
                        <Star
                          className={`w-6 h-6 ${textColor} hover:text-yellow-400 cursor-pointer`}
                        />
                      )}
                    </button>
                  </div>

                  {/* Board Details */}
                  <div className="p-4 pt-0">
                    <p className="text-tertiary text-base font-bold leading-normal">
                      {board.name}
                    </p>
                    <p className="text-fourth  text-sm font-normal leading-normal">
                      {board.description
                        ? board.description.length > 50
                          ? board.description.slice(0, 50) + "..."
                          : board.description
                        : "No description available."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right section placeholder */}
      <div className="flex flex-col gap-6  overflow-y-auto">
        {/* Button */}
        <div className="flex justify-end gap-3 relative">
          <button
            className="bg-[#38a8ae] text-white px-4 py-2 rounded-lg hover:bg-[#2c8b90] transition text-sm flex items-center gap-2"
            onClick={openCreateBoardModal}
          >
            <Plus size={18} />
            New Board
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="font-semibold text-gray-800 mb-3">Add Members</h2>

          {/* Search + Role Filter */}
          <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search Members"
                value={searchMemberTerm}
                onChange={(e) => setSearchMemberTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae] transition"
              />
            </div>

            <select
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38a8ae] transition"
            >
              <option value="all">Filter by Role</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="manager">Manager</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          {/* Members List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredMembers && filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 mb-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  {/* Left: Avatar + Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar || "/default-avatar.png"}
                      alt={`${member.first_name} ${member.last_name}`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300 "
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 ">
                        {member.first_name} {member.last_name}
                      </p>
                      <p className="text-xs text-gray-500  capitalize">
                        {member.org_role || "member"}
                      </p>
                    </div>
                  </div>

                  {/* Right: Button */}
                  <button
                    className={`px-3 py-1 flex items-center gap-2 text-sm rounded-full font-semibold transition ${
                      member.project_member
                        ? "bg-green-100 text-green-800 cursor-not-allowed dark:bg-green-900 dark:text-green-300"
                        : "bg-[#38a8ae] text-white hover:bg-[#2c8b90]"
                    }`}
                    disabled={member.project_member}
                    onClick={() => addMemberToProject(member)}
                  >
                    {member.project_member ? (
                      <>
                        <CheckCheck size={16} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add
                      </>
                    )}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">
                No members found.
              </p>
            )}
          </div>
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
                {activity.map((req) => (
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
