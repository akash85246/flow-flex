import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword({ currentStep, setCurrentStep, steps }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  // Live validation for confirm password
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value.trim()) {
      setConfirmPasswordError("Please confirm your password");
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      valid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    if (!passwordError && !confirmPasswordError && valid) {
      console.log("Password reset successfully:", password);
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }
  };

  return (
    <div className="w-full font-inter">
      <h1 className="text-4xl font-semibold mb-2">Reset Password</h1>
      <p className="text-fourth mb-6 text-sm md:text-lg">
        Create a new password to secure your Flow Flex account and regain access.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className={`px-4 py-2 rounded-lg border w-full focus:outline-none focus:ring-2 text-lg
                ${passwordError ? "border-red-400 focus:ring-red-400" : "border-secondary focus:ring-primary"}`}
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

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="••••••••"
              className={`px-4 py-2 rounded-lg border w-full focus:outline-none focus:ring-2 text-lg
                ${confirmPasswordError ? "border-red-400 focus:ring-red-400" : "border-secondary focus:ring-primary"}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-secondary hover:text-fourth"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {confirmPasswordError && (
            <p className="text-red-400 text-xs">{confirmPasswordError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </form>
    </div>
  );
}