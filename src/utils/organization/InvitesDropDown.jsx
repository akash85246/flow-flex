import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Mail, ExternalLink, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InvitesDropdown({ showInvites, setShowInvites }) {
  const navigate = useNavigate();
  const invitations = useSelector((state) => state.invitation.invitation);
    const Backend_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <AnimatePresence >
      {showInvites && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 right-6 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <Mail size={16} className="text-[#38a8ae]" /> Invitations
            </h3>
            <button
              onClick={() => setShowInvites(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          {invitations.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              You have no pending invitations 🎉
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
              {invitations.map((invite, idx) => (
                <div
                  key={idx}
                  className="p-4 hover:bg-gray-50 transition-colors flex gap-3"
                >
                  {/* Organization Logo */}
                  <div className="flex-shrink-0">
                    <img
                       src={`${Backend_URL}${invite.organization_logo}`}
                      alt="Org Logo"
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">
                          {invite.organization_name}
                        </h4>
                        <a
                          href={invite.organization_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#38a8ae] hover:underline"
                        >
                          {invite.organization_website?.replace("https://", "")}
                        </a>
                      </div>

                      <span className="flex items-center text-[11px] text-gray-400">
                        <Clock size={12} className="mr-1" />
                        Expires:{" "}
                        {new Date(invite.expires_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    {/* Inviter Info */}
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={invite.inviter_avatar || "/default-avatar.png"}
                        alt="Inviter"
                        className="w-6 h-6 rounded-full border border-gray-200"
                      />
                      <p className="text-xs text-gray-500">
                        Invited by{" "}
                        <span className="font-medium text-gray-700">
                          {invite.inviter_firstname} {invite.inviter_lastname}
                        </span>{" "}
                        ({invite.inviter_role_in_org})
                      </p>
                    </div>

                    {/* Role & Expiry */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-600">
                        Role:{" "}
                        <span className="font-semibold text-[#38a8ae]">
                          {invite.invited_role}
                        </span>
                      </span>
                       {/* Action Button */}
                    <a
                      href={`/organization/join?token=${invite.invitation_token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#38a8ae] hover:underline self-start"
                    >
                      View & Accept <ExternalLink size={12} />
                    </a>
                    </div>

                   
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}