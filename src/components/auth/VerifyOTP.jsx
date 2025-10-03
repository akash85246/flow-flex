import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

export default function VerifyOTP({ setCurrentStep, currentStep, steps }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
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

  const handleVerify = () => {
    if (otp.length === 6) {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  const handleResend = () => {
    if (!resendEnabled) return;
    alert("OTP has been resent!");
    setTimer(60);
    setResendEnabled(false);
  };

  return (
    <div className="w-full font-inter ">
      <h1 className="text-4xl font-semibold mb-2">Authenticate Account</h1>
      <p className="text-fourth mb-6 text-sm md:text-lg">
        Enter the 4-digit code sent to your email or phone to verify your
        account.
      </p>

      {/* OTP Input */}
      <OtpInput
        value={otp}
        onChange={setOtp}
        containerStyle="flex justify-evenly gap-4"
        inputStyle="!w-16 h-12 !md:w-16 md:h-16 border border-gray-300 rounded-lg text-center text-xl md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />

      <div className="flex flex-col items-center w-full  mt-6 gap-4">
        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition"
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
          Sign In with a different account
        </button>
      </div>
    </div>
  );
}
