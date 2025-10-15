import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  X,
  SquarePen,
  LayoutDashboard,
  Bell,
  Cpu,
  Users,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { form } from "framer-motion/client";

export default function CreateNewProject({ isOpen, onClose }) {
  const user = useSelector((state) => state.user);
  const organization = useSelector(
    (state) => state.organization.selectedOrganization
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    banner: null,
    bannerPreview: null,
    visibility: "public",
    enable_board_analytics: false,
    enable_realtime_notifications: false,
    enable_ai_task_assistance: false,
    allow_cross_board_collaboration: false,
    enable_activity_logs: false,
  });

  const projectSettings = [
    {
      name: "Enable Board Analytics",
      description: "Track progress and productivity across all project boards.",
      icon: <LayoutDashboard size={20} className="text-primary" />,
      key: "enable_board_analytics",
    },
    {
      name: "Enable Real-time Notifications",
      description: "Get instant alerts for updates and task changes.",
      icon: <Bell size={20} className="text-primary" />,
      key: "enable_realtime_notifications",
    },
    {
      name: "Enable AI Task Assistance",
      description: "Use AI for task suggestions and workload balance.",
      icon: <Cpu size={20} className="text-primary" />,
      key: "enable_ai_task_assistance",
    },
    {
      name: "Allow Cross-Board Collaboration",
      description: "Link or move tasks across project boards.",
      icon: <Users size={20} className="text-primary" />,
      key: "allow_cross_board_collaboration",
    },
    {
      name: "Allow Guest Access",
      description: "Invite external users with limited access.",
      icon: <Users size={20} className="text-primary" />,
      key: "allow_guest_access",
    },
    {
      name: "Activity Log Tracking",
      description: "Record all project activities and changes.",
      icon: <ClipboardList size={20} className="text-primary" />,
      key: "enable_activity_logs",
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

      // append normal fields
      data.append("org_id", organization.id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("visibility", formData.visibility);
      data.append("enable_ai_assist", formData.enable_ai_task_assistance);
      data.append("enable_activity_logs", formData.enable_activity_logs);
      data.append(
        "enable_notifications",
        formData.enable_realtime_notifications
      );

      data.append("allow_guest_access", formData.allow_guest_access);

      data.append(
        "allow_cross_board_collaboration",
        formData.allow_cross_board_collaboration
      );
      // append boolean fields
      data.append("enable_board_analytics", formData.enable_board_analytics);

      // append files if they exist
      if (formData.banner) data.append("banner", formData.banner);

      const result = await axios.post(
        `${Backend_URL}/api/project/create`,
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
      console.error("Error creating Project:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-[95%] md:w-[90%] lg:w-[85%] max-w-8xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50 shrink-0">
              <h2 className="text-base md:text-lg font-semibold text-gray-800">
                Create New Project
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="text-gray-500 hover:text-gray-700" size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className=" p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow"
            >
              {/* Left Section */}
              <div className="col-span-2 space-y-5">
                {/* Project Identity */}
                <section>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Project Identity
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Define the essentials of your project to get started.
                  </p>

                  {/* Banner */}
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                    <div className="h-28 md:h-32 w-full flex items-center justify-center text-gray-400 text-sm">
                      {formData.bannerPreview ? (
                        <img
                          src={formData.bannerPreview}
                          alt="Project Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "Upload Banner"
                      )}
                    </div>
                    <label className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                      <SquarePen className="text-primary" size={16} />
                    </label>
                  </div>

                  {/* Project Name */}
                  <div className="mt-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Marketing Website Redesign"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the project's purpose, goals, or scope..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    />
                  </div>

                  {/* Visibility */}
                  <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visibility
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          id: "public",
                          title: "Public to Organization",
                          desc: "Everyone in your organization can view project name, members, and status.",
                        },
                        {
                          id: "private",
                          title: "Private to Project Members",
                          desc: "Only assigned members can view project details and activity.",
                        },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                            formData.visibility === option.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="visibility"
                            value={option.id}
                            checked={formData.visibility === option.id}
                            onChange={handleChange}
                            className="mt-1 accent-primary"
                          />
                          <div>
                            <p className="font-medium text-sm text-gray-800">
                              {option.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {option.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Section */}
              <aside className="col-span-1 bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-200 shadow-sm self-start">
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  Permissions & Features
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Enable or disable project-level tools and features.
                </p>

                <div className="flex flex-col gap-2.5">
                  {projectSettings.map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {setting.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {setting.name}
                          </p>
                          <p className="text-[0.7rem] text-gray-500">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        name={setting.key}
                        checked={formData[setting.key]}
                        onChange={handleChange}
                        className="h-4 w-4 accent-primary ml-2"
                      />
                    </div>
                  ))}
                </div>
              </aside>

              {/* Footer */}
              <div className="flex justify-end gap-3 col-span-3 border-t border-gray-200 pt-3 mt-4 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 shadow-sm transition"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
