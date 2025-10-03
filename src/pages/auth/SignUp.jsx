import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    termAndCondition: false,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) error = "Last name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!emailRegex.test(value)) error = "Enter a valid email";
        break;
      case "organization":
        if (!value.trim()) error = "Organization is required";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (!passwordRegex.test(value))
          error =
            "Password must be at least 8 chars, include a number & special char";
        break;
      case "confirmPassword":
        if (!value) error = "Confirm your password";
        else if (value !== form.password) error = "Passwords do not match";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    const fieldValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));


    const error = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted ", form);
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full font-inter flex justify-center flex-col h-full max-w-3xl m-auto md:p-4 lg:p-6 ">
      <h1 className="text-4xl font-semibold mb-2">Create Account</h1>
      <p className="text-gray-500 mb-6 text-sm md:text-lg">
        Fill in your details to create your account.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-light text-secondary">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm -mt-2">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-base font-light text-secondary">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm -mt-2">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm -mt-2">{errors.email}</p>
          )}
        </div>

        {/* Organization */}
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-light text-secondary">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Organization"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.organization ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.organization && (
            <p className="text-red-500 text-sm -mt-2">{errors.organization}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm md:text-base font-light text-secondary">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute top-12 right-3 flex items-center text-secondary hover:text-fourth"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm -mt-2">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm md:text-base font-light text-secondary">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            className="absolute top-12 right-3 flex items-center text-secondary hover:text-fourth"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm -mt-2">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-cyan-400 border-gray-600 rounded focus:ring-cyan-400"
          />
          <span className="text-sm text-gray-400">Remember me</span>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="termAndCondition"
            checked={form.termAndCondition}
            onChange={handleChange}
            className="h-4 w-4 text-cyan-400 border-gray-600 rounded focus:ring-cyan-400"
            required
          />
          <span className="text-sm text-gray-400">
            I agree to all the{" "}
            <span className="text-tertiary">Terms</span> and{" "}
            <span className="text-tertiary">Privacy policy</span>
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!form.termAndCondition}
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-gray-500 text-sm text-center">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-500">
          Sign In
        </a>
      </p>
    </div>
  );
}