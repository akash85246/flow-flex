import { useState } from "react";
import {
  LayoutDashboard,
  Trello,
  UsersRound,
  BarChart3,
  FolderKanban,
  CalendarDays,
  Settings,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import logo from "../../assets/logo/FF.jpg";
import { clearUser } from "../../redux/slices/userSlice";

export default function ProjectSidebar({ projectSlug }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const handleTabClick = (tab, route) => {
    setActiveTab(tab);
    if (route) navigate(route);
  };

  const logoutUser = async () => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const result = await axios.get(`${Backend_URL}/api/auth/signout`, {
        withCredentials: true,
      });
      if (result.status === 200) {
        dispatch(clearUser());
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
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
        {/* Brand / Logo */}
        <div
          className="flex items-center justify-between mb-6 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <img src={logo} alt="Flow Flex" className="w-10 h-10 rounded-full" />
        </div>

        {/* Menu */}
        <ul className="space-y-2 text-gray-700 text-sm">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active={activeTab === "overview"}
            collapsed={isCollapsed}
            onClick={() =>
              handleTabClick("overview", `/project/${projectSlug}/overview`)
            }
          />

         <SidebarItem
            icon={<Trello size={18} />}
            label="Boards"
            active={activeTab === "boards"}
            collapsed={isCollapsed}
            onClick={() =>  handleTabClick("boards")}
          />

           {/* Templates Dropdown */}
          <li>
            <button
              onClick={() =>
                isCollapsed
                  ?  handleTabClick("templates")
                  : setIsTemplatesOpen(!isTemplatesOpen)
              }
              onDoubleClick={() =>  handleTabClick("templates")}
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 transition${
                activeTab === "templates"
                  ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                  : "hover:bg-gray-100"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="flex items-center gap-2">
                <FolderKanban size={18} />
                {!isCollapsed && <span>Templates</span>}
              </div>
              {!isCollapsed &&
                (isTemplatesOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                ))}
            </button>
            {isTemplatesOpen && !isCollapsed && (
              <ul className="ml-8 mt-1 space-y-1 text-gray-600 text-sm">
                <li
                  className="hover:text-primary cursor-pointer transition"
                  onClick={() =>  handleTabClick("agile")}
                >
                  Agile Board
                </li>
                <li
                  className="hover:text-primary cursor-pointer transition"
                  onClick={() =>  handleTabClick("kanban")}
                >
                  Kanban
                </li>
                <li
                  className="hover:text-primary cursor-pointer transition"
                  onClick={() =>  handleTabClick("sprint")}
                >
                  Sprint Tracker
                </li>
                <li
                  className="hover:text-primary cursor-pointer transition"
                  onClick={() =>  handleTabClick("roadmap")}
                >
                  Product Roadmap
                </li>
              </ul>
            )}
          </li>

          <hr className="my-3 border-gray-300" />

          <SidebarItem
            icon={<UsersRound size={18} />}
            label="Members"
            active={activeTab === "members"}
            collapsed={isCollapsed}
            onClick={() =>
              handleTabClick("members", `/project/${projectSlug}/members`)
            }
          />

          <SidebarItem
            icon={<CalendarDays size={18} />}
            label="Calendar"
            active={activeTab === "calendar"}
            collapsed={isCollapsed}
            onClick={() =>
              handleTabClick("calendar")
            }
          />

          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Analytics"
            active={activeTab === "analytics"}
            collapsed={isCollapsed}
            onClick={() =>
              handleTabClick("analytics", `/project/${projectSlug}/analytics`)
            }
          />

          <SidebarItem
            icon={<MessageSquare size={18} />}
            label="Messages"
            active={activeTab === "messages"}
            collapsed={isCollapsed}
            onClick={() =>
              handleTabClick("messages")
            }
          />

          <hr className="my-3 border-gray-300" />

         <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            active={activeTab === "settings"}
            collapsed={isCollapsed}
            onClick={() =>  handleTabClick("settings")}
          />
          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Billing"
            active={activeTab === "billing"}
            collapsed={isCollapsed}
            onClick={() =>  handleTabClick("billing")}
          />
          <SidebarItem
            icon={<HelpCircle size={18} />}
            label="Help & Support"
            active={activeTab === "help"}
            collapsed={isCollapsed}
            onClick={() =>  handleTabClick("help")}
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