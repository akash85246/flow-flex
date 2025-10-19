import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { setBoards, setSelectedBoard } from "../../redux/slices/BoardsSlice";
import { clearOrganizations } from "../../redux/slices/organizationsSlice";
import {
  clearProjects,
  clearSelectedProject,
} from "../../redux/slices/projectSlice";
import { clearInvitation } from "../../redux/slices/invitationSlice";
import {
  setSelectedOrganization,
  setActiveTab,
  clearActiveTab,
  clearSelectedOrganization,
} from "../../redux/slices/organizationSlice";

import {
  Menu,
  X,
  Share2,
  ListFilter,
  Bell,
  OctagonAlert,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
  User,
  Star,
} from "lucide-react";
import Logo from "../../assets/logo/FF.jpg";
import Avatar from "../../assets/dashboard/icons/avatar.svg";
import axios from "axios";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useSelector((state) => state.organization.activeTab);
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentBoard, setCurrentBoard] = useState(null);
  const user = useSelector((state) => state.user);
  const selectedBoard = useSelector((state) => state.boards.selectedBoard);
  const project = useSelector((state) => state.projects.selectedProject);
  const boards = useSelector((state) => state.boards.boards);
  const avatarUrl = user.avatar?.startsWith("http")
    ? user.avatar
    : `${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`;
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const { slug } = useParams();
  console.log("Navbar slug:", slug);
  //getBoard details
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/api/board/details`, {
          params: { slug },
          withCredentials: true,
        });

        if (response.status === 200) {
          console.log("Fetched board details:", response.data.board);
          dispatch(setSelectedBoard(response.data.board));
        } else {
          console.error(" Failed to fetch board details");
        }
      } catch (error) {
        console.error("Error fetching boarddetails:", error);
      }
    };

    fetchBoardDetails();
  }, [dispatch, Backend_URL, slug]);

  //get Boards for dropdown
  useEffect(() => {
    try {
      const fetchBoard = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/board/project-boards`,
          {
            params: { project_id: selectedBoard.project_id },
            withCredentials: true,
          }
        );

        if (response.data.boards.length > 0) {
          dispatch(setBoards(response.data.boards));
          setCurrentBoard(response.data.boards[0].id);
        }
      };
      console.log("Selected Board in Navbar useEffect:", selectedBoard);
      if (selectedBoard !== undefined && selectedBoard?.project_id !== null) {
        fetchBoard();
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  }, [dispatch, selectedBoard, project, Backend_URL]);

  const handleOrgChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setCurrentBoard(selectedId);

    dispatch(setSelectedBoard(boards.find((o) => o.id === selectedId)));
    dispatch(setActiveTab("home"));
    console.log("Location:", location.pathname);
  };

  const handleAddBoard = () => {
    dispatch(setActiveTab("organizations"));
    if (!location.pathname.includes("/board")) {
      navigate(`/dashboard`);
    }
  };

  const logoutUser = async () => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const result = await axios.get(
        `${Backend_URL}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      if (result.status !== 200) {
        throw new Error("Logout failed");
      }

      dispatch(clearUser());
      dispatch(clearOrganizations());
      dispatch(clearProjects());
      dispatch(clearSelectedProject());
      dispatch(clearInvitation());
      dispatch(clearActiveTab());
      dispatch(clearSelectedOrganization());

      navigate("/welcome");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
      return;
    }
    alert("Logged out");
  };

  const toggleProfile = () => setProfileOpen(!profileOpen);

  return (
    <nav
      className={` shadow-md fixed top-0 w-full z-50 transition-colors duration-300 bg-white`}
    >
      <div className="container mx-auto flex justify-between items-center px-2 md:px-4 py-3 max-w-7xl">
        {/* Logo */}
        <div className="flex items-center space-x-2 pr-2">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="Flow Flex Logo"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
            />
            <h1 className="hidden md:block text-lg lg:text-xl font-bold bg-gradient-to-r from-[#012e41] to-[#38a8ae] bg-clip-text text-transparent">
              Flow Flex
            </h1>
          </a>
        </div>

        {/* Middle section: Organization Switcher */}
        <div className="flex items-center ">
          <select
            value={selectedBoard ? selectedBoard.id : ""}
            onChange={handleOrgChange}
            onClick={() => {
              if (!location.pathname.includes("/board")) {
                navigate(`/dashboard`);
              }
            }}
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary max-w-20 md:max-w-40 cursor-pointer"
          >
            <option key="0" disabled>
              Boards
            </option>
            {boards.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2 bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-2 relative transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400">
          {/* Search Icon */}
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full pl-10 pr-4 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
          />

          {/* Filter Button */}
          <button
            className="flex items-center justify-center gap-1  ml-2 text-gray-500 
    hover:text-blue-600  rounded-lg transition-all duration-200 active:scale-95"
            title="Filter"
          >
            <ListFilter size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Favourite Board */}
          <button
            className="relative p-2 rounded-lg hover:bg-yellow-50 transition-all duration-200 group"
            title="Favourite Board"
          >
            <Star className="w-5 h-5 text-yellow-400 group-hover:text-yellow-500 transition-transform duration-200 group-hover:scale-110" />
          </button>

          {/* Alerts */}
          <button
            className="relative p-2 rounded-lg hover:bg-red-50 transition-all duration-200 group"
            title="System Alerts"
          >
            <OctagonAlert className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5 shadow-sm">
              2
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-yellow-50 transition-all duration-200 group"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-white text-[10px] font-semibold rounded-full px-1.5 shadow-sm">
              5
            </span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 
  bg-white hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-600 
  text-gray-700  transition-all duration-200 active:scale-95"
          >
            <Share2 size={18} className="transition-colors duration-200" />
            <span className="font-medium text-sm">Share</span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition cursor-pointer"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-light font-poppins  text-white border">
                  {user?.first_name?.[0]?.toUpperCase()}
                  {user?.last_name?.[0]?.toUpperCase()}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex md:hidden items-center w-1/2 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-gray-600 hover:text-primary ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden flex justify-center items-center shadow-lg border-t bg-white `}
        >
          <div className="flex flex-col space-y-3 p-4">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <OctagonAlert size={18} /> Alerts
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              {avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Profile"
                  className="w-5 h-5 rounded-full object-cover border"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-sm font-light font-poppins  text-white border">
                  {user?.first_name?.[0]?.toUpperCase()}
                  {user?.last_name?.[0]?.toUpperCase()}
                </div>
              )}
              Profile
            </button>

            <button
              onClick={() => logoutUser()}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition text-red-500"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
