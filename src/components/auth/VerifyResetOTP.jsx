import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/userSlice";
import axios from "axios";

export default function VerifyResetOTP({
  setCurrentStep,
  currentStep,
  steps,
  email,
  setOtpVerified,
  otpVerified,
}) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${Backend_URL}/api/auth/verify-reset-otp`,
        {
          email,
          otp,
          rememberMe: false,
        },
        { withCredentials: true }
      );
      console.log("OTP Verification Response:", response.data);
      if (response.status === 200) {
        setOtpVerified(true);
        setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
      }
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  const handleResend = async () => {
    if (!resendEnabled) return;
    setDisabled(true);
    try {
      const Backend_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${Backend_URL}/api/auth/resend-otp`,
        { email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("OTP has been resent!");
        setTimer(60);
        setResendEnabled(false);
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="w-full font-inter">
      <h1 className="text-4xl font-semibold mb-2">Verify OTP</h1>
      <p className="text-fourth mb-6 text-sm md:text-lg">
        Enter the one-time password sent to your email to continue securing your
        Flow Flex account.
      </p>

      {/* OTP Input */}
      <OtpInput
        value={otp}
        onChange={setOtp}
        containerStyle="flex justify-evenly gap-4"
        inputStyle="!w-12 h-12 md:!w-16 md:h-16 border border-gray-300 rounded-lg text-center text-xl md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />

      <div className="flex flex-col items-center w-full mt-6 gap-4">
        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={disabled || otp.length !== 6}
          className={`w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition${
            disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
          }`}
        >
          Verify
        </button>

        {/* Resend OTP */}
        <button
          onClick={handleResend}
          disabled={!resendEnabled}
          className={`text-sm md:text-base underline transition-colors duration-200 ${
            resendEnabled
              ? "text-blue-500 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {resendEnabled
            ? "Didn’t receive the code? Resend OTP"
            : `Resend OTP in ${timer}s`}
        </button>

        {/* Sign In with Different Account */}
        <button
          className="text-sm md:text-base text-gray-700 hover:text-tertiary underline transition-colors duration-200"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Change Email Address
        </button>
      </div>
    </div>
  );
}
