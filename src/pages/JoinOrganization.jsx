import { useState, useEffect } from "react";
import axios from "axios";
import { Info } from "lucide-react";
import JoinOrganizationImage from "../assets/organization/illustrations/joinOrganization.svg";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function JoinOrganization() {
  const [organization, setOrganization] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(
          `${Backend_URL}/api/organization/invitation-details`,
          { params: { token }, withCredentials: true }
        );

        const invitation = response.data.invitation;

        if (
          invitation.organization_visibility === "private" &&
          invitation.invitee_email !== user.email
        ) {
          navigate("/dashboard");
          return;
        }

        setOrganization(invitation);
      } catch (err) {
         navigate("/dashboard");
        console.error(err);
      } finally {
        setLoading(false);
       
      }
    };

    fetchOrganization();
  }, [token, Backend_URL, navigate, user.email]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;

  const handleAcceptInvitation = async () => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${Backend_URL}/api/organization/accept-invitation`,
        {},
        {
          params: { token },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        console.error("Failed to join organization:", response);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  const handleDeclineInvitation = () => {
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const response = axios.delete(
        `${Backend_URL}/api/organization/decline-invitation`,
        {
          params: { token },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("You have declined the invitation.");
        navigate("/dashboard");
      } else {
        console.error("Failed to decline invitation:", response);
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* Left Banner */}
      <div className="bg-gradient-to-br from-[#38a8ae] to-[#2c8b90] text-white flex flex-col justify-center items-center p-10 md:p-16 relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
          Join Organization
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-center max-w-md">
          Join an existing organization using an invite link to start
          collaborating with your team.
        </p>
        <img
          src={JoinOrganizationImage}
          alt="Join Organization"
          className="absolute bottom-0 md:relative md:bottom-auto md:max-w-sm lg:max-w-md opacity-90"
        />
      </div>

      {/* Right Card */}
      <div className="flex flex-col justify-center items-center p-6 ">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 md:p-10 flex flex-col items-center space-y-6">
          {/* Organization Logo */}
          <div className="relative w-full h-40 mb-12">
            {/* Banner */}
            <img
              src={`${Backend_URL}${organization.organization_banner}`}
              alt="Organization Banner"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />

            {/* Logo */}
            <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 w-24 h-24">
              <img
                src={`${Backend_URL}${organization.organization_logo}`}
                alt="Organization Logo"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Organization Info */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Join {organization.organization_name}
            </h2>
            <p className="text-sm text-gray-400 py-2">
              You have been invited to join this{" "}
              <span className="font-medium text-gray-800">
                {organization.invited_role
                  ? organization.invited_role.charAt(0).toUpperCase() +
                    organization.invited_role.slice(1).toLowerCase()
                  : "Member"}
              </span>
            </p>
            <p className="text-gray-500 mt-2 text-sm md:text-base border-t pt-2 border-secondary/20">
              {organization.organization_description ||
                "No description provided."}
            </p>
          </div>

          {/* Inviter Info Card */}
          <div className="bg-white rounded-xl shadow-md p-5 w-full max-w-md mx-auto">
            {/* Inviter Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={organization.inviter_avatar || JoinOrganizationImage}
                alt="Inviter Avatar"
                className="w-14 h-14 rounded-full border-2 border-gray-200 shadow-sm object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {organization.inviter_firstname || "Someone"}{" "}
                  {organization.inviter_lastname || ""}
                </p>
                <p className="text-gray-500 text-sm">invited you</p>
              </div>
            </div>

            {/* Visibility Badge */}
            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
              <div className="flex-shrink-0 mt-0.5">
                <Info size={18} className="text-blue-500" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {organization.organization_visibility === "private"
                  ? "This is a private organization. Only invited members can view and join."
                  : "This is a public organization. Anyone with the link can view and request to join."}
              </p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full mt-4">
            <button
              onClick={handleDeclineInvitation}
              className="w-full md:w-1/2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Decline
            </button>
            <button
              onClick={() => handleAcceptInvitation()}
              className="w-full md:w-1/2 bg-gradient-to-r from-[#38a8ae] to-[#2c8b90] text-white px-6 py-2 rounded-lg shadow-lg hover:from-[#2c8b90] hover:to-[#38a8ae] transition"
            >
              Accept Invitation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
