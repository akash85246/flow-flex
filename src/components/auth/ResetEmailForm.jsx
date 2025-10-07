import { useState } from "react";
import axios from "axios";
import { s } from "framer-motion/client";

export default function ResetEmail({
  currentStep,
  setCurrentStep,
  steps,
  email,
  setEmail,
}) {
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Live validation for email
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!emailError && email) {
      try {
        const Backend_URL = import.meta.env.VITE_BACKEND_URL;
        const result = await axios.post(
          `${Backend_URL}/api/auth/reset-otp`,
          { email },
          {
            withCredentials: true,
          }
        );
        console.log("Email for reset:", email, result);
        if (result.status === 200) {
          console.log("Reset Email Response:", result);
          alert("If this email is registered, a reset link has been sent.");
          setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
        }
      } catch (error) {
        console.error("Error sending reset email:", error);
        alert("Failed to send reset email. Please try again.");
        return;
      } finally {
        setDisabled(false);
      }
    }
  };

  return (
    <div className="w-full font-inter flex justify-center flex-col min-h-[25rem]">
      <h1 className="text-4xl font-semibold mb-2">Enter Email Address</h1>
      <p className="text-fourth mb-6 text-sm md:text-lg">
        A text with a 6-digit code will be sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary flex justify-between">
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 text-lg
              ${
                emailError
                  ? "border-red-400 focus:ring-red-400"
                  : "border-secondary focus:ring-primary"
              }`}
          />
          {emailError && <p className="text-red-400 text-xs">{emailError}</p>}
        </div>

        {/* Submit Button */}
        <button
          disabled={disabled || emailError || !email}
          type="submit"
          className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition ${
            disabled
              ? "opacity-50 cursor-not-allowed hover:scale-100"
              : ""
          }`}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </form>
    </div>
  );
}
