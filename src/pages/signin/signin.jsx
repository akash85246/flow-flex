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
import { useNavigate } from "react-router-dom";
import MyContext from "../../utils/context/MyContext";

export default function SignIn() {
  const { authToken, updateAuthToken } = useAuth();
  const {
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    pass,
    setPass,
    isSignedIn,
    setIsSignedIn,
  } = useContext(MyContext);
  const [isEmail, setIsEmail] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const signInEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_SIGN_IN_ENDPOINT;

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

  const handlePasswordChange = (event) => {
    if (event && event.target) {
      setPassword(event.target.value);
    }
  };

  const toggleSignInOption = () => {
    setIsEmail(!isEmail);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEmail) {
      if (email == "" && phoneNumber == "") {
        toast.error("enter user detail");
        return;
      } else if (pass == "") {
        toast.error("enter password");
        return;
      }
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

  const handleGoogleSignIn = (event) => {
    event.preventDefault();
    // Handle Google sign-in here
  };

  return (
    <div className="relative h-screen">
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex">
        {/* <div className="  w-52 h-auto bg-slate-400 "></div> */}
        <div className="bg-black bg-opacity-80 rounded-lg shadow-md p-10 w-screen h-screen p-auto flex justify-center items-center flex-col m-auto md:w-full md:h-full">
          <form className="space-y-4 " onSubmit={handleSubmit}>
            <h1 className="text-white text-2xl font-bold">Account Login</h1>
            <p className="text-white">
              If you are already a member you can login with your{" "}
              {isEmail ? "email address" : "phone number"}.
            </p>

            <InputCard
              type={isEmail ? "email" : "tel"}
              label={isEmail ? "Email" : "Phone Number"}
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
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              regex={passwordRegex}
              setValue={setPass}
              errorLabel="wrong password"
            />
            <div className="flex-col flex justify-between "></div>

            <div className="flex gap-1 justify-between">
              <div className="flex flex-col gap-3">
                <div className="text-white flex gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label>Remember me</label>
                </div>
                <a href="/signup" className="text-blue-500">
                  Sign up now
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <LoaderButton
                  label="Sign In"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  loading={loading1}
                />
                <a href="/forgetPassword" className="text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
          <div className="w-full m-8">
            <hr className=" border-b-2 border-white w-full" />
          </div>

          <div>
            <LoaderButton
              label="Sign in with Google"
              class="bg-transparent border-blue-500 border-2 hover:border-white hover:text-white text-blue-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleGoogleSignIn}
              image={googleIcon}
              loading={loading2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
