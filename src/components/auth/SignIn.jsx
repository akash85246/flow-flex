import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "../../assets/auth/icons/google.svg";
import axios from "axios";

export default function SignIn({
  currentStep,
  setCurrentStep,
  steps,
  rememberMe,
  setRememberMe,
  email,
  setEmail,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disabled,setDisabled]=useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  // Live validation for password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value.trim()) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be 8+ chars, include uppercase, lowercase, number, and special char."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !email || !password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const Backend_URL = import.meta.env.VITE_BACKEND_URL;
    setDisabled(true);

    try {
      const response = await axios.post(`${Backend_URL}/api/auth/signin`, {
        email,
        password,
      });

      console.log("Response:", response.data);
      alert("OTP sent successfully!");

      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong.");
    }finally{
      setDisabled(false);
    }
  };

  return (
    <div className="w-full font-inter">
      <h1 className="text-4xl font-semibold mb-2">Account Login</h1>
      <p className="text-fourth mb-6 text-sm md:text-lg">
        If you are already a member, log in with your email and password.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary flex justify-between">
            <span>Email Address</span>
            <a
              href="/resetpassword"
              className="text-sm text-primary hover:text-secondary"
            >
              Forgot Password
            </a>
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

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className={`px-4 py-2 rounded-lg border w-full focus:outline-none focus:ring-2 text-lg
                ${
                  passwordError
                    ? "border-red-400 focus:ring-red-400"
                    : "border-secondary focus:ring-primary"
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-secondary hover:text-fourth"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-400 text-xs">{passwordError}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-cyan-400 border-gray-600 rounded focus:ring-cyan-400"
          />
          <span className="text-sm text-gray-400">Remember me</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled || emailError || passwordError || !email || !password}
          className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition  ${
            disabled
              ? "opacity-50 cursor-not-allowed hover:scale-100"
              : ""
          }`}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="absolute w-full border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 bg-white z-10">or</span>
        </div>

        {/* Google Sign In */}
        <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google-signin`}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-gray-300 
             text-gray-700 font-semibold shadow-sm hover:bg-gray-100 hover:shadow-md hover:scale-105 
             transition duration-200 ease-in-out active:scale-95"
        >
          <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </a>
      </form>
    </div>
  );
}
