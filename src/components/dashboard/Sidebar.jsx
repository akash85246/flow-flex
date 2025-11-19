import { useState } from "react";
import {
  LayoutDashboard,
  Trello,
  FolderKanban,
  Users,
  UserRound,
  Settings,
  CreditCard,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  LogOut,
  HelpCircle,
  BarChart3,
  CalendarDays,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import {
  setActiveTab,
  clearActiveTab,
} from "../../redux/slices/organizationSlice";
import logo from "../../assets/logo/FF.jpg";
import axios from "axios";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeTab = useSelector((state) => state.organization.activeTab);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleItemClick = (tab) => {
    dispatch(setActiveTab(tab));
    dispatch(setActiveTab(tab));
  };

  const logoutUser = async () => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const result = await axios.get(
        `${Backend_URL}/api/auth/signout`,
        {},
        { withCredentials: true }
      );
      if (result.status === 200) {
        dispatch(clearUser());
        navigate("/welcome");
     
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
      return;
    }
    alert("Logged out");
  };

  const handleDoubleClick = () => setIsCollapsed((prev) => !prev);

  return (
    <aside
      onDoubleClick={handleDoubleClick}
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white h-screen overflow-y-auto border-r border-gray-200 shadow-sm flex flex-col justify-between fixed left-0 top-0 z-10 transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="p-4">
        {/* Brand */}
        <div
          className="flex items-center justify-between mb-6 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <img
            src={logo}
            alt="Flow Flex Logo"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Main Menu */}
        <ul className="space-y-2 text-gray-700 text-sm">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Home"
            active={activeTab === "home"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("home")}
          />

          {/* Management Section */}
          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Analytics"
            active={activeTab === "analytics"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("analytics")}
          />
          <SidebarItem
            icon={<CalendarDays size={18} />}
            label="Calendar"
            active={activeTab === "calendar"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("calendar")}
          />
          <SidebarItem
            icon={<MessageSquare size={18} />}
            label="Messages"
            active={activeTab === "messages"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("messages")}
          />
          <SidebarItem
            icon={<UserRound size={18} />}
            label="Members"
            active={activeTab === "members"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("members")}
          />
          <SidebarItem
            icon={<Users  size={18} />}
            label="Teams"
            active={activeTab === "members"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("teams")}
          />

          <hr className="my-3 border-gray-300" />

          {/* Project Section */}
          {!isCollapsed && (
            <p className="text-xs uppercase text-gray-400 mb-2">Projects</p>
          )}
          <SidebarItem
            icon={<FileText size={18} />}
            label="All Projects"
            active={activeTab === "projects"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("projects")}
          />
          <SidebarItem
            icon={<Plus size={18} />}
            label="New Project"
            active={activeTab === "newProject"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("newProject")}
          />

          <hr className="my-3 border-gray-300" />

          {/* Settings Section */}
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            active={activeTab === "settings"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("settings")}
          />
          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Billing"
            active={activeTab === "billing"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("billing")}
          />
          <SidebarItem
            icon={<HelpCircle size={18} />}
            label="Help & Support"
            active={activeTab === "help"}
            collapsed={isCollapsed}
            onClick={() => handleItemClick("help")}
          />
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="flex items-center justify-center gap-2 text-gray-600 hover:text-red-500 w-full transition"
          onClick={() => logoutUser()}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active, collapsed, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
          : "hover:bg-gray-100"
      } ${collapsed ? "justify-center" : ""}`}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </li>
  );
}
