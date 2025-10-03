import { useState } from "react";


export default function ResetEmail({ currentStep, setCurrentStep, steps }) {
  const [email, setEmail] = useState("");


  const [emailError, setEmailError] = useState("");


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



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError  && email ) {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
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
              ${emailError ? "border-red-400 focus:ring-red-400" : "border-secondary focus:ring-primary"}`}
          />
          {emailError && <p className="text-red-400 text-xs">{emailError}</p>}
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