import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import {
  setOrganizations,
  clearOrganizations,
} from "../../redux/slices/organizationsSlice";
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
  ClipboardPlus,
  Bell,
  OctagonAlert,
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
  User,
  Plus,
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
  const [currentOrg, setCurrentOrg] = useState(null);
  const user = useSelector((state) => state.user);
  const selectedOrganization = useSelector(
    (state) => state.organization.selectedOrganization
  );

  const organizations =
    useSelector((state) => state.organizations.Organizations) || [];
  const avatarUrl = user.avatar?.startsWith("http")
    ? user.avatar
    : `${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`;

  useEffect(() => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const fetchOrganizations = async () => {
        const response = await axios.get(
          `${Backend_URL}/api/organization/user-organizations`,
          {
            withCredentials: true,
          }
        );
        dispatch(setOrganizations(response.data.organizations));
        if (selectedOrganization === null) {
          dispatch(
            setSelectedOrganization(response.data.organizations[0] || null)
          );
        }
        if (response.data.organizations.length > 0) {
          setCurrentOrg(response.data.organizations[0].id);
        }
      };
      fetchOrganizations();
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  }, [dispatch, selectedOrganization]);

  const handleOrgChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setCurrentOrg(selectedId);

    dispatch(
      setSelectedOrganization(organizations.find((o) => o.id === selectedId))
    );
    dispatch(setActiveTab("home"));
    console.log("Location:", location.pathname);
  };

  const handleAddOrg = () => {
    dispatch(setActiveTab("organizations"));
    if (!location.pathname.includes("/dashboard")) {
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
            value={selectedOrganization ? selectedOrganization.id : ""}
            onChange={handleOrgChange}
            onClick={() => {
              if (!location.pathname.includes("/dashboard")) {
                navigate(`/dashboard`);
              }
            }}
            className="border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary max-w-20 md:max-w-40 cursor-pointer"
          >
            <option key="0" disabled>
              Organization
            </option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>

          {/* Add Organization Button */}
          <button
            onClick={handleAddOrg}
            className={`md:p-1 rounded-full  transition mx-2 cursor-pointer"
            `}
            title="Join or create organization"
          >
            <Plus
              size={26}
              className={`${
                activeTab === "organizations"
                  ? " text-tertiary"
                  : "text-primary"
              } hover:text-tertiary hover:b`}
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2 relative pr-2">
          <div className="hidden md:flex items-center w-1/2 relative pr-2">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="w-full pl-10 pr-2 md:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm "
              className="w-full pl-10 pr-2 md:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm "
            />
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Create / Add */}
            <button
              className="p-2 rounded-lg  text-tertiary hover:text-primary transition cursor-pointer"
              className="p-2 rounded-lg  text-tertiary hover:text-primary transition cursor-pointer"
              title="Create New"
            >
              <ClipboardPlus />
            </button>

            {/* Alerts */}
            <button className="relative cursor-pointer">
              <button className="relative cursor-pointer">
                <OctagonAlert
                  className="rounded-lg  text-gray-600 hover:text-red-500 cursor-pointer transition"
                  title="System Alerts"
                />
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] rounded-full px-1.5">
                  2
                </span>
              </button>
            </button>

            {/* Notifications */}
            <button className="relative cursor-pointer">
              <button className="relative cursor-pointer">
                <Bell
                  className=" rounded-lg  text-gray-600 hover:text-yellow-500 cursor-pointer transition"
                  title="Notifications"
                />
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-[10px] rounded-full px-1  text-xs">
                  5
                </span>
              </button>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition cursor-pointer"
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
            className="md:hidden text-gray-600 hover:text-primary ml-2"
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
                <ClipboardPlus size={18} /> Create
              </button>
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
      </div>
    </nav>
  );
}
