import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import ResetEmailForm from "../../components/auth/ResetEmailForm";
import ResetPasswordForm from "../../components/auth/ResetPassword";
import VerifyResetOTPForm from "../../components/auth/VerifyResetOTP";
import Complete from "../../components/auth/Complete";

const steps = [
  { id: 1, title: "Email" },
  { id: 2, title: "2FA / OTP" },
  { id: 3, title: "Reset Password" },
  { id: 4, title: "Complete" },
];

export default function ResetPassword() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center w-full md:p-4 lg:p-6 max-w-3xl">
      {/* Progress Bar */}
      <div className="flex items-center justify-between w-full max-w-2xl relative">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center relative flex-1"
          >
            {/* Step Circle */}
            <motion.div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                ${
                  currentStep >= step.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/40"
                    : "bg-fourth border-gray-600"
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {currentStep > step.id ? (
                <CheckCircle className="text-white w-4 h-4" />
              ) : (
                <Circle className="text-white w-4 h-4" />
              )}
            </motion.div>

            {/* Step Title */}
            <p
              className={`mt-2 flex text-sm md:text-xs lg:text-sm font-medium text-center transition-colors duration-300 ${
                currentStep >= step.id ? "text-cyan-400" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-[0.2rem] -z-10
                ${currentStep > step.id ? "bg-cyan-400" : "bg-gray-700"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-10 w-full">
        {currentStep === 1 && (
          <ResetEmailForm
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && (
          <VerifyResetOTPForm
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <ResetPasswordForm
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 4 && (
          <Complete
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
}
