import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderButton from "../../components/buttons/button";
import leftArrow from "../../assets/left-arrow.png";
import OtpInput from "react-otp-input";

const OTPForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const { authToken, updateAuthToken } = useAuth();
  const {
    phoneNumber,

    email,
    setIsSignedIn,

    pass,
  } = useContext(MyContext);
  const [loading1, setLoading1] = useState(false);

  const signUpOtpEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_SIGN_UP_OTP_ENDPOINT;
  const signUpOtpResendEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_SIGN_UP_RESEND_OTP_ENDPOINT;
  const signInEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_SIGN_IN_ENDPOINT;
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, otp);
    if (email == "" || otp == "") {
      toast.error("enter user detail");
      return;
    }

    setLoading1(true);

    try {
      const response = await axios.post(signUpOtpEndpoint, {
        email: email,
        otp: otp,
      });

      console.log(authToken);
      if (response.data.success) {
        toast.success("Email Verified");
        handleSignIn(event);
        setLoading1(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
        console.error("Server responded with an error:", errorMessage);
      } else if (error.request) {
        toast.error("No response received. Network error occurred.");
        console.error("No response received. Network error occurred.");
      } else {
        toast.error("Error setting up the request.");
        console.error("Error setting up the request.", error);
      }
    } finally {
      setLoading1(false);
    }
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

  const Resent = async (event) => {
    event.preventDefault();
    setResendTimer(60);
    console.log(email, OtpInput);
    if (email == "") {
      toast.error("enter user detail");
      return;
    }

    setLoading1(true);

    try {
      const response = await axios.post(signUpOtpResendEndpoint, {
        email: email,
      });
      if (response.data.success) {
        toast.success("OTP has been sent please check your email");

        setLoading1(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
        console.error("Server responded with an error:", errorMessage);
      } else if (error.request) {
        toast.error("No response received. Network error occurred.");
        console.error("No response received. Network error occurred.");
      } else {
        toast.error("Error setting up the request.");
        console.error("Error setting up the request.", error);
      }
    } finally {
      setLoading1(false);
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (email == "" || phoneNumber == "") {
      toast.error("enter user detail");
      return;
    } else if (pass == "") {
      toast.error("enter password");
      return;
    }

    setLoading1(true);
    console.log(signInEndpoint);

    try {
      const response = await axios.post(
        signInEndpoint,
        {
          email: email,
          password: pass,
        },
        {
          withCredentials: false,
        }
      );

      const receivedToken = response.data.data.token;

      updateAuthToken(receivedToken);
      console.log(authToken);
      if (response.data.success) {
        toast.success("Successfully logged in!");
        setIsSignedIn(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
        console.error("Server responded with an error:", errorMessage);

        if (errorMessage === "No user exists with this email") {
          toast.error("No user Esits");
          setLoading1(false);
        }
      } else if (error.request) {
        toast.error("No response received. Network error occurred.");
        console.error("No response received. Network error occurred.");
      } else {
        toast.error("Error setting up the request.");
        console.error("Error setting up the request.", error);
      }
    } finally {
      setLoading1(false);
    }
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
          loading={loading1}
        />
        {resendTimer > 0 ? (
          <div className="resend forLog disabled text-white text-center cursor-not-allowed">
            Resend OTP in {resendTimer} seconds
          </div>
        ) : (
          <div
            className="resend forLog text-blue-500 text-center cursor-pointer"
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
