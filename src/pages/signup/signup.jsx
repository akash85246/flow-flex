import { useEffect, useMemo, useState, useContext } from "react";
import background from "../../assets/background.avif";
import backArrow from "../../assets/backArrow.svg";
import LoaderButton from "../../components/buttons/button";
import InputCard from "../../components/cards/inputCard";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import OTPForm from "./otp";
import { motion } from "framer-motion";

import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpOtp() {
  const [loading1, setLoading1] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("signup");
  const [rememberMe, setRememberMe] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const { authToken, updateAuthToken } = useAuth();
  const {
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    pass,
    setPass,
    name,
    setName,
  } = useContext(MyContext);

  const signUpEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_SIGN_UP_ENDPOINT;

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };
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
          distance: 500,
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
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 40,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );
  const onBack = () => {
    setStep("login");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, name, phoneNumber, pass);
    if (email == "" || phoneNumber == "" || name == "") {
      toast.error("enter user detail");
      return;
    } else if (pass == "") {
      toast.error("enter password");
      return;
    }

    setLoading1(true);

    try {
      const response = await axios.post(signUpEndpoint, {
        username: name,
        email: email,
        password: pass,
      });

      console.log(authToken);
      if (response.data.success) {
        toast.success("Successfully Otp is sent to your email");
        setStep("sigup");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
        console.error("Server responded with an error:", error);
      } else if (error.request) {
        toast.error("No response received. Network error occurred.");
        console.error(
          "No response received. Network error occurred.",
          error.request
        );
      } else {
        toast.error("Error setting up the request.");
        console.error("Error setting up the request.", error);
      }
    } finally {
      setLoading1(false);
    }
  };

  const handleUsernameChange = (event) => {
    if (event && event.target) {
      setUsername(event.target.value);
    }
  };


  const handleEmailChange = (event) => {
    if (event && event.target) {
      setEmail1(event.target.value);
    }
  };
  const handlePhoneChange = (event) => {
    if (event && event.target) {
      setPhone(event.target.value);
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
        <div className="bg-black bg-opacity-80  shadow-md px-5 m-auto w-screen h-screen flex justify-between items-center flex-col sm:py-5  sm:w-full sm:h-full">
          {step != "sigup" ? (
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <h1 className="text-white text-2xl font-bold">Create account</h1>
              <InputCard
                type="text"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your name"
                regex={usernameRegex}
                errorLabel="Invalid Username"
                required={true}
                setValue={setName}
              />
              <InputCard
                type="email"
                label="Email"
                value={email1}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                regex={emailRegex}
                errorLabel="Invalid email"
                required={true}
                isEmail={true}
                setValue={setEmail}
              />
              <InputCard
                type="tel"
                label="Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter your Phone number"
                regex={phoneRegex}
                errorLabel="Invalid Phone Number"
                required={true}
                isEmail={false}
                setValue={setPhoneNumber}
              />
              <InputCard
                type="password"
                label=" Password"
                value={confirmPassword}
                onChange={(value) => setConfirmPassword(value)}
                placeholder="Confirm your password"
                password={password}
                confirm={true}
                confirmPasswordRegex={passwordRegex}
                errorLabel="password does'nt match"
                required={true}
                setValue={setPass}
              />

              <div className="flex gap-10 justify-between">
                <div className="flex flex-col gap-5">
                  <div className="text-white flex gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="text-sm ">Remember me</label>
                  </div>
                  <div className="text-white flex gap-2">
                    <input
                      type="checkbox"
                      checked={policyCheck}
                      onChange={() => setPolicyCheck(!policyCheck)}
                      required
                    />
                    <label className="text-sm ">
                      I agree to all the
                      <br />
                      <span
                        className="text-blue-300 cursor-pointer"
                        onClick={toggleDialog}
                      >
                        Terms and Privacy policy
                      </span>{" "}
                      {isOpen && (
                        <motion.div
                          className="absolute top-0 bg-white text-black h-96 w-96 p-8 overflow-y-auto overflow-x-hidden"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <h1 className="text-3xl font-bold mb-6 text-black">
                            Terms and Conditions
                          </h1>
                          <p>
                            These Terms and Conditions govern your use of the
                            Kanban board web application operated by Flow-Flex .
                          </p>
                          <p>
                            Please read these Terms and Conditions carefully
                            before using our Service.
                          </p>
                          <p>
                            Your access to and use of the Service is conditioned
                            on your acceptance of and compliance with these
                            Terms. These Terms apply to all visitors, users, and
                            others who access or use the Service.
                          </p>
                          <p>
                            By accessing or using the Service, you agree to be
                            bound by these Terms. If you disagree with any part
                            of the terms, then you may not access the Service.
                          </p>
                          <h2 className="text-2xl font-bold mt-6 mb-3">
                            Accounts
                          </h2>
                          <p>
                            When you create an account with us, you must provide
                            us with accurate, complete, and up-to-date
                            information for the purposes of registration.
                            Failure to do so constitutes a breach of the Terms,
                            which may result in immediate termination of your
                            account on our Service.
                          </p>
                          <p>
                            You are responsible for safeguarding the password
                            that you use to access the Service and for any
                            activities or actions under your password, whether
                            your password is with our Service or a third-party
                            service.
                          </p>
                          <p>
                            You agree not to disclose your password to any third
                            party. You must notify us immediately upon becoming
                            aware of any breach of security or unauthorized use
                            of your account.
                          </p>
                          <h2 className="text-2xl font-bold mt-6 mb-3">
                            Changes
                          </h2>
                          <p>
                            We reserve the right, at our sole discretion, to
                            modify or replace these Terms at any time. If a
                            revision is material, we will try to provide at
                            least 30 days' notice prior to any new terms taking
                            effect. What constitutes a material change will be
                            determined at our sole discretion.
                          </p>
                          <p>
                            By continuing to access or use our Service after
                            those revisions become effective, you agree to be
                            bound by the revised terms. If you do not agree to
                            the new terms, please stop using the Service.
                          </p>
                          <h2 className="text-2xl font-bold mt-6 mb-3 w-[80vw]">
                            Contact Us
                          </h2>
                          <p>
                            If you have any questions about these Terms, please
                            contact us.
                          </p>
                          <p>Effective date: March 23,2024</p>

                          {/* <img
                            src={backArrow}
                            className="h-8 w-8 cursor-pointer z-40"
                            alt="Back Arrow"
                            onClick={handleClose}
                          /> */}
                        </motion.div>
                      )}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap">
                  <LoaderButton
                    label="Sign Up"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    loading={loading1}
                  />
                  <a href="/signin" className="text-blue-500">
                    Already have an account? Log In
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <OTPForm onBack={onBack} />
          )}
        </div>
        {/* <div className=" w-52 h-auto bg-slate-400 "></div> */}
      </div>
    </div>
  );
}
