import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import {
  Menu,
  X,
  ClipboardPlus,
  Bell,
  OctagonAlert,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
  User,
} from "lucide-react";
import Logo from "../../assets/logo/FF.jpg";
import Avatar from "../../assets/dashboard/icons/avatar.svg";
import axios from "axios";

export default function Navbar() {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
      <div className="container mx-auto flex justify-between items-center px-4 py-3 max-w-7xl">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Flow Flex Logo"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          />
          <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#012e41] to-[#38a8ae] bg-clip-text text-transparent">
            Flow Flex
          </h1>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2 relative">
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

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Create / Add */}
          <button
            className="p-2 rounded-lg  text-tertiary hover:text-primary transition"
            title="Create New"
          >
            <ClipboardPlus />
          </button>

          {/* Alerts */}
          <div className="relative">
            <OctagonAlert
              className="rounded-lg  text-gray-600 hover:text-red-500 cursor-pointer transition"
              title="System Alerts"
            />
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] rounded-full px-1.5">
              2
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Bell
              className=" rounded-lg  text-gray-600 hover:text-yellow-500 cursor-pointer transition"
              title="Notifications"
            />
            <span className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] rounded-full px-1  text-xs">
              5
            </span>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition"
            >
              <img
                src={Avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border"
              />
              {profileOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {profileOpen && (
              <div className="absolute top-14 right-0 w-48 bg-white border rounded-lg shadow-md py-2 z-50">
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  <User size={16} className="mr-2 text-gray-600" /> Profile
                </a>
                <button
                  onClick={() => logoutUser()}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 transition text-red-500"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </div>
            )}
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
          className="md:hidden text-gray-600 hover:text-primary"
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
              <ClipboardPlus size={18} /> Create
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <OctagonAlert size={18} /> Alerts
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <Bell size={18} /> Notifications
            </button>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
              <img
                src={Avatar}
                alt="Profile"
                className="w-5 h-5 rounded-full object-cover border"
              />{" "}
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
