import { useEffect, useMemo, useState, useContext } from "react";
import background from "../../assets/background.avif";
import LoaderButton from "../../components/buttons/button";
import InputCard from "../../components/cards/inputCard";
import googleIcon from "../../assets/googleIcon.png";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyContext from "../../utils/context/MyContext";
import OTPForm from "./otp"

export default function ForgetPassword() {
  const { authToken, updateAuthToken } = useAuth();
  const {
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    resetPass,
    setResetPass,
  } = useContext(MyContext);
  const [isEmail, setIsEmail] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading1, setLoading1] = useState(false);
  
  const [step, setStep] = useState("forgotPassword");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const forgetEndPoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_FORGOT_PASSWORD_ENDPOINT;
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        image: `url(${background})`,
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 50,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffff",
        },
        links: {
          color: "#ffff",
          distance: 300,
          enable: true,
          opacity: 1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 100,
          },
          value: 50,
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const handleUsernameChange = (event) => {
    if (event && event.target) {
      setUsername(event.target.value);
    }
  };

  const toggleSignInOption = () => {
    setIsEmail(!isEmail);
  };
  const onBack = () => {
    setStep("login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, phoneNumber, resetPass);
    if (isEmail) {
      if (email == "" && phoneNumber == "") {
        toast.error("enter user detail");
        return;
      } else if (resetPass == "") {
        toast.error("enter password");
        return;
      }
    }

    setLoading1(true);

    try {
      const response = await axios.post(forgetEndPoint, {
        email: email,
       
      });

      if (response.data.success) {
        toast.success("Successfully logged in!");
        setStep("otp");
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
    <div className="relative h-screen">
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex">
        <div className="bg-black bg-opacity-80 rounded-lg shadow-md p-10 w-screen h-screen p-auto flex justify-center items-center flex-col m-auto md:w-full md:h-full">
          {step == "forgotPassword" ? (
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <h1 className="text-white text-2xl font-bold">Forgot Password</h1>
              <p className="text-white">
                A text with 6-digit code has to been sent to your entered{" "}
                {isEmail ? "email address" : "phone number"}.
              </p>

              <InputCard
                type={isEmail ? "email" : "tel"}
                label={
                  isEmail
                    ? "Enter Registered Email"
                    : "Enter Registered Phone Number"
                }
                id={isEmail ? "username-input" : "phone-input"}
                setPhoneNumber={!isEmail && setPhoneNumber}
                setValue={isEmail && setEmail}
                value={username}
                onChange={handleUsernameChange}
                placeholder={
                  isEmail ? "Enter your email" : "Enter your phone number"
                }
                regex={isEmail ? emailRegex : phoneRegex}
                toggleSignInOption={toggleSignInOption}
                sideLabel={true}
                isEmail={isEmail}
                setIsEmail={setIsEmail}
                errorLabel={`Wrong ${isEmail ? "email" : "phone number"}`}
              />

              <InputCard
                type="password"
                label="Reset Password"
                value={confirmPassword}
                onChange={(value) => setConfirmPassword(value)}
                placeholder="Confirm your password"
                password={password}
                confirm={true}
                confirmPasswordRegex={passwordRegex}
                errorLabel="password does'nt match"
                required={true}
                setValue={setResetPass}
              />
              <div className="flex-col flex justify-between "></div>

              <div className="flex gap-1 justify-between">
                <div className="flex flex-col gap-3">
                  <p className=" text-white">
                    Already have an account ?{" "}
                    <a href="/signin" className="text-blue-500">
                      {" "}
                      Sign in
                    </a>
                  </p>

                  <p className=" text-white">
                    {" "}
                    Don&apos;t have an account ?{" "}
                    <a href="/signup" className="text-blue-500">
                      {" "}
                      Sign up
                    </a>
                  </p>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <LoaderButton
                    label="Send Verification Code"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    loading={loading1}
                  />
                </div>
              </div>
            </form>
          ) : (
            <OTPForm onBack={onBack}></OTPForm>
          )}
        </div>
      </div>
    </div>
  );
}
