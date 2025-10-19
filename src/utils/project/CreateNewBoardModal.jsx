import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { HexColorPicker } from "react-colorful";
import {
  X,
  SquarePen,
  LayoutDashboard,
  Palette,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";
import bg1 from "../../assets/project/backgrounds/bg1.jpg";
import bg2 from "../../assets/project/backgrounds/bg2.jpg";
import bg3 from "../../assets/project/backgrounds/bg3.jpg";
import bg5 from "../../assets/project/backgrounds/bg5.jpg";
import bg6 from "../../assets/project/backgrounds/bg6.jpg";
import bg7 from "../../assets/project/backgrounds/bg7.jpg";
import bg8 from "../../assets/project/backgrounds/bg8.jpg";
import bg9 from "../../assets/project/backgrounds/bg9.jpg";
import bg10 from "../../assets/project/backgrounds/bg10.jpg";
import bg11 from "../../assets/project/backgrounds/bg11.jpg";
import bg12 from "../../assets/project/backgrounds/bg12.jpg";

export default function CreateNewBoard({ isOpen, onClose }) {
  const project = useSelector((state) => state.projects.selectedProject);
  const organization = useSelector(
    (state) => state.organization.selectedOrganization
  );
  const [openPallette, setOpenPalette] = useState(false);
  const [colorOptions, setColorOptions] = useState([
    "#38a8ae",
    "#f97316",
    "#8b5cf6",
    "#ef4444",
    "#0ea5e9",
    "#22c55e",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    banner: null,
    bannerPreview: null,
    color: "#38a8ae",
    visibility: "private",
    background: "",
    customBackground: null,
  });
  const [tempColor, setTempColor] = useState(formData.color);

  const defaultBackgrounds = [
    bg1,
    bg2,
    bg3,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
    bg12,
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
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

  // Custom background upload
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        customBackground: file,
        background: preview,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting board...");

    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const data = new FormData();

      data.append("project_id", project.id);
      data.append("org_id", organization.id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("visibility", formData.visibility);
      data.append("color", formData.color);

      if (formData.banner instanceof File) {
        data.append("banner", formData.banner);
      }
      if (formData.customBackground instanceof File) {
        data.append("background", formData.customBackground);
      } else if (
        typeof formData.background === "string" &&
        formData.background !== ""
      ) {
        data.append("background", formData.background);
      }

      const result = await axios.post(`${Backend_URL}/api/board/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200) {
        setFormData({
          name: "",
          description: "",
          banner: null,
          bannerPreview: null,
          color: "#38a8ae",
          visibility: "private",
          background: "",
          customBackground: null,
        });

        onClose();
      }
    } catch (error) {
      console.error("Error creating board:", error);
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
            className="bg-white w-[95%] md:w-[80%] max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <LayoutDashboard size={18} className="text-primary" />
                Create New Board
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="text-gray-500 hover:text-gray-700" size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              id="create-board-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 overflow-y-auto"
            >
              {/* LEFT SIDE: Details */}
              <div className="space-y-5">
                {/* Board Details */}
                <section>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Board Details
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Give your board a name and a short description.
                  </p>

                  {/* Board Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Board Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Design Sprint"
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="mt-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={10}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe this board's purpose..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    />
                  </div>
                </section>

                {/* Visibility */}
                <section>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Board Visibility
                  </h4>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  >
                    <option value="private">
                      Private (Board members only)
                    </option>
                    <option value="public">Visible to project members</option>
                  </select>
                </section>
              </div>

              {/* RIGHT SIDE: Appearance */}
              <div className="space-y-6">
                {/* Banner Upload */}
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Appearance
                  </h3>

                  <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-sm group h-28 flex items-center justify-center text-gray-400 text-sm">
                    {formData.bannerPreview ? (
                      <img
                        src={formData.bannerPreview}
                        alt="Board Banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Upload Banner"
                    )}
                    <label className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                      <SquarePen className="text-primary" size={16} />
                    </label>
                  </div>
                </div>

                {/* Background Selection */}
                <div>
                  <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <ImageIcon size={16} /> Background
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {defaultBackgrounds.map((bg, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, background: bg }))
                        }
                        className={`h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-transform hover:scale-105 ${
                          formData.background === bg
                            ? "border-primary shadow-md"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={bg}
                          alt={`bg-${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {/* Custom Upload */}
                    <label className="h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData((prev) => ({
                              ...prev,
                              background: URL.createObjectURL(file),
                            }));
                          }
                        }}
                      />
                      {formData.background ? (
                        <>
                          <img
                            src={formData.background}
                            alt="Background Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <UploadCloud
                              size={20}
                              className="text-white mb-1"
                            />
                            <span className="text-xs text-white font-medium">
                              Change
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <UploadCloud size={18} className="mb-1" />
                          <span className="text-xs font-medium">Upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                    <Palette size={16} /> Accent Color
                  </h4>
                  <div className="relative flex flex-wrap gap-2">
                    {colorOptions.map((clr, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, color: clr }))
                        }
                        className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                          formData.color === clr
                            ? "border-gray-800 scale-110"
                            : "border-gray-200"
                        }`}
                        style={{ backgroundColor: clr }}
                      ></button>
                    ))}
                    <button
                      className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                      onClick={() => setOpenPalette(!openPallette)}
                    >
                      <Palette />
                    </button>

                    {openPallette && (
                      <div className="flex flex-col items-center bg-white z-50 rounded-lg shadow-md border border-gray-200 absolute bottom-10 left-0">
                        <HexColorPicker
                          color={tempColor}
                          onChange={setTempColor}
                          className="shadow-inner w-full z-50"
                        />

                        <div className="grid grid-cols-2 w-full ">
                          <button
                            type="button"
                            onClick={() => setOpenPalette(false)}
                            className="px-4 py-1.5 text-sm border border-gray-300  text-gray-600 hover:bg-gray-100 transition w-full rounded-l-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                color: tempColor,
                              }));
                              setColorOptions((prev) => {
                                if (!prev.includes(tempColor)) {
                                  const updated = [...prev, tempColor];
                                  return updated.slice(-10);
                                }
                                return prev;
                              });
                              setOpenPalette(false);
                            }}
                            className="px-4 py-1.5 text-sm bg-[#38a8ae] text-white hover:bg-[#2f9094] transition rounded-r-lg"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 col-span-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-board-form"
                  className="px-5 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 shadow-sm transition"
                >
                  Create Board
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
