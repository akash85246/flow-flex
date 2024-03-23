// OTPForm.js
import { useState, useEffect } from "react";

import LoaderButton from "../../components/buttons/button";
import leftArrow from "../../assets/left-arrow.png";
import OtpInput from "react-otp-input";

const OTPForm = ({ onBack }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSubmit function if needed
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const Resent = () => {
    setResendTimer(60);
  };
  return (
    <div className=" flex flex-col justify-between  gap-5 w-[90vw] h-[70vh] m-auto p-10 sm:w-full sm:h-full">
      {" "}
      <h1 className="text-white text-2xl font-bold">Enter verification code</h1>
      <p className="text-white">
        A text with a 6-digit code has been sent to your email account.
      </p>
      <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="my-2 text-white text-lg ">
          Enter verification code
        </label>
        <div>
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            renderSeparator={<span>--</span>}
            inputType="number"
            containerStyle={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            inputStyle={{
              width: "3rem",
              height: "4rem",
              fontSize: "2rem",
              outline: "none",
              overflow: "hidden",
              borderRadius: "5px",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <LoaderButton
          label="Submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        />
        {resendTimer > 0 ? (
          <div className="resend forLog disabled text-white text-center">
            Resend OTP in {resendTimer} seconds
          </div>
        ) : (
          <div
            className="resend forLog text-white text-center"
            id="resnd"
            onClick={Resent}
          >
            Resend OTP
          </div>
        )}

        <button
          className="right-1 h-20 w-20 flex justify-center items-center"
          onClick={onBack}
        >
          <img src={leftArrow} className="hover:h-10 hover:w-10" alt="Back" />
        </button>
      </form>
    </div>
  );
};

export default OTPForm;
