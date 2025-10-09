import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  X,
  UploadCloud,
  SquarePen,
  ShieldCheck,
  Bell,
  Cpu,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import organizationLogo from "../../assets/organization/icons/organizationLogo.png";

export default function CreateOrganizationModal({ isOpen, onClose }) {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
    logoPreview: null,
    banner: null,
    bannerPreview: null,
    website: "",
    region: "",
    industry: "",
    timezone: "",
    type: "team",
    default_role: "member",
    visibility: "private",
    plan: "free",
    allow_guest_access: false,
    enable_ai_assist: false,
    enable_activity_logs: false,
    enable_notifications: false,
    enable_board_templates: false,
  });

  const features = [
    {
      name: "Enable Activity Logs",
      description: "Track all activities within this organization.",
      icon: <LayoutDashboard size={20} className="text-primary" />,
      key: "enable_activity_logs",
    },
    {
      name: "Enable Notifications",
      description: "Send alerts for important updates and changes.",
      icon: <Bell size={20} className="text-primary" />,
      key: "enable_notifications",
    },
    {
      name: "Enable AI Assistance",
      description: "Get AI suggestions for tasks and templates.",
      icon: <Cpu size={20} className="text-primary" />,
      key: "enable_ai_assist",
    },
    {
      name: "Allow Guest Access",
      description: "Permit external users to view or collaborate.",
      icon: <Users size={20} className="text-primary" />,
      key: "allow_guest_access",
    },
    {
      name: "Enable Board Templates",
      description: "Provide pre-made templates for boards.",
      icon: <ShieldCheck size={20} className="text-primary" />,
      key: "enable_board_templates",
    },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => {
      const updated = { ...prev };
      if (type === "checkbox") updated[name] = checked;
      else if (type === "file") updated[name] = files[0];
      else updated[name] = value;

      return updated;
    });
  };

  // Logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      }));
    }
  };

  // Banner upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        banner: file,
        bannerPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const data = new FormData();
      console.log("Form Data to be submitted:", user);
      // append normal fields
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("website", formData.website);
      data.append("region", formData.region);
      data.append("industry", formData.industry);
      data.append("timezone", formData.timezone);
      data.append("type", formData.type);
      data.append("default_role", formData.default_role);
      data.append("visibility", formData.visibility);
      data.append("plan", formData.plan);
      data.append("allow_guest_access", formData.allow_guest_access);
      data.append("enable_ai_assist", formData.enable_ai_assist);
      data.append("enable_activity_logs", formData.enable_activity_logs);
      data.append("enable_notifications", formData.enable_notifications);
      data.append("enable_board_templates", formData.enable_board_templates);
      data.append("owner_id", user.id);

      if (formData.logo) data.append("logo", formData.logo);
      if (formData.banner) data.append("banner", formData.banner);

      const result = await axios.post(
        `${Backend_URL}/api/organization/create`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
     
      if (result.status === 200) {
        // Reset form
        setFormData({
          name: "",
          description: "",
          logo: null,
          banner: null,
          website: "",
          region: "",
          industry: "",
          timezone: "",
          type: "team",
          visibility: "private",
          plan: "free",
          allow_guest_access: false,
          enable_ai_assist: false,
          enable_activity_logs: false,
          enable_notifications: false,
          enable_board_templates: false,
        });
        // Close modal

        onClose();
      }
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-fourth/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-7xl rounded-2xl shadow-xl relative overflow-y-auto "
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-secondary px-4 py-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Create New Organization
              </h2>
              <button onClick={onClose}>
                <X className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-0 grid grid-cols-1 md:grid-cols-3 gap-2 p-2"
            >
              <div className="col-span-2 space-y-4 p-2 ">
                {/* Organization Identity */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Organization Identity
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Provide the core details of your organization.
                  </p>

                  <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    {/* Banner Section */}
                    <div className="relative h-32 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                      {formData.banner ? (
                        <img
                          src={formData.bannerPreview}
                          alt="Organization Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Upload Banner"
                      )}
                      <label className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:bg-gray-100 transition">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleBannerUpload}
                        />
                        <SquarePen />
                      </label>
                    </div>

                    {/* Logo + Name Section */}
                    <div className="flex items-center px-4 -mt-10">
                      {/* Logo */}
                      <div className="relative">
                        <img
                          src={formData.logoPreview || organizationLogo}
                          alt="Organization Logo"
                          className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-sm"
                        />
                        <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                          <SquarePen />
                        </label>
                      </div>

                      {/* Organization Name */}
                      <div className="flex-1 ml-4 mt-4 md:mt-10 bg-white z-10">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter organization name"
                          className="w-full rounded-lg px-3 py-2 text-lg focus:outline-none "
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 mt-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      placeholder="Describe your organization..."
                    />
                  </div>

                  {/* Inputs: Website, Region, Industry, Timezone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {["website", "region", "industry", "timezone"].map(
                      (field) => (
                        <div key={field}>
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor={field}
                          >
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <input
                            id={field}
                            type={field === "website" ? "url" : "text"}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={
                              field === "website"
                                ? "https://example.com"
                                : `e.g. ${
                                    field === "region"
                                      ? "North America"
                                      : field === "industry"
                                      ? "Software"
                                      : "GMT+5:30"
                                  }`
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* Type Select */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="type"
                      >
                        Organization Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="team">Team</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="type"
                      >
                        Default Role
                      </label>
                      <select
                        id="type"
                        name="default_role"
                        value={formData.default_role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      >
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
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions & Features */}
              <div className="col-span-1 bg-white p-2 rounded-xl shadow-sm border border-gray-200 space-y-4">
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  Permissions & Features
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                  Configure the organization's visibility and feature access.
                </p>

                {/* Visibility */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                {/* Feature Toggles */}
                <div className="grid grid-cols-1 gap-2">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {feature.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{feature.name}</p>
                          <p className="text-xs text-gray-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        name={feature.key}
                        checked={formData[feature.key]}
                        onChange={handleChange}
                        className="h-5 w-5 text-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 col-span-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-tertiary transition focus:outline-none"
                >
                  Create Organization
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
