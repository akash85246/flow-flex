import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../utils/context/MyContext";
import { useAuth } from "../../utils/authContext/authContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

import plan1Img from "../../assets/plans1.svg";
import plan2Img from "../../assets/plans2.svg";
import plan3Img from "../../assets/plans3.svg";
import solution1Img from "../../assets/solution1.svg";
import solution2Img from "../../assets/solution2.svg";
import solution3Img from "../../assets/solution3.svg";
import resources1Img from "../../assets/resources1.svg";
import Dropdown from "../../utils/dropDown/dropDown";
import NavCard from "../cards/navCard";
import { toast } from "react-toastify";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { authToken, updateAuthToken } = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const {
    // phoneNumber,
    // email,
    // setIsSignedIn,
    // isSignedIn,
    // pass,
    userPhoto,
    setUserPhoto,
  } = useContext(MyContext);

  const fetchProfilePhotoEndpoint = import.meta.env
    .VITE_REACT_APP_RENDER_API_USER_PROFILE_PHOTO_ENDPOINT;

  const navigate = useNavigate();

  const solution1Function = () => {
    navigate("/solution");
  };
  const solution2Function = () => {
    navigate("/solution");
  };
  const solution3Function = () => {
    navigate("/solution");
  };
  const plan1Function = () => {
    navigate("/price");
  };
  const plan2Function = () => {
    navigate("/price");
  };
  const plan3Function = () => {
    navigate("/price");
  };

  useEffect(() => {
    localStorage.setItem("userPhoto", JSON.stringify(userPhoto));
  }, [userPhoto]);

  useEffect(() => {
    if (authToken) {
      const getPhoto = async () => {
        console.log(fetchProfilePhotoEndpoint, authToken);
        try {
          const response = await axios.get(fetchProfilePhotoEndpoint, {
            headers: {
              "auth-token": authToken,
            },
          });

          if (response.data && response.data.photoUrl) {
            const photo = response.data.photoUrl.replace(
              /public/g,
              "https://pro-go.onrender.com"
            );

            setUserPhoto(photo);
            console.log(photo);
          } else {
            updateAuthToken("");
            console.error("Invalid response format for photo");
          }
        } catch (error) {
          console.error("Error fetching photo:", error);
          toast.error(error.response.data.message);
          if (
            error.response.data.message ==
            "Subscription expired or free trial expired, access denied."
          ) {
            console.log(error.response.data.message);
          } else {
            updateAuthToken("");
            console.log();
          }
        }
      };

      getPhoto();
    }
  }, [authToken, fetchProfilePhotoEndpoint, setUserPhoto, updateAuthToken]);

  const customContentSolutions = (
    <div className="custom-content z-0 ">
      <h3 className="md:text-center mt-5 text-sm  sm:text-lg md:text-xl font-bold text-purple-900 pl-5 w-3/5 md:w-full">
        Take a page out of these pre-built Pro-Go playbooks{""}
        <span className="text-blue-600">{""}designed for all teams</span>
      </h3>
      <div className="flex flex-col sm:grid w-3/5 grid-cols-3 sm:w-3/4 md:m-auto md:p-10 md:gap-5 gap-2 sm:p-4 p-2">
        <NavCard
          heading="Pro-Go For Marketing Teams"
          image={solution1Img}
          detail="Whether launching a new product, campaign, or creating content, experience how Pro-Go helps marketing teams around the world organize, plan, and get more done."
          clickedFunction={solution1Function}
        />
        <NavCard
          heading="Pro-Go For Design Teams"
          image={solution2Img}
          detail="From creative brainstorms to the final touches, discover how Pro-Go helps your design teams deliver with style."
          clickedFunction={solution2Function}
        />
        <NavCard
          heading="Pro-Go For Remote Teams"
          image={solution3Img}
          detail="From team bonding and brainstorming to meetings and project planning, discover how Pro-Go keeps remote teams connected, no matter where they’re located around the world."
          clickedFunction={solution3Function}
        />
      </div>
    </div>
  );
  const customContentPlans = (
    <div className="custom-content w-screen m-auto z-0">
      <h3 className="md:text-center mt-5 text-xs sm:text-md md:text-xl font-bold text-purple-900 pl-5 w-3/5 md:w-full">
        Whether you’re a team of 2 or 2,000, Pro-Go flexible pricing model means
        {""}
        <span className="text-blue-600">
          {""} you only pay for what you need.
        </span>
      </h3>
      <div className=" sm:grid w-3/5 grid-cols-3 sm:w-3/4 md:m-auto md:p-10 md:gap-5  p-2 gap-2 flex flex-col">
        <NavCard
          heading="Professional"
          image={plan1Img}
          clickedFunction={plan1Function}
          buttonLabel="Go to Pricing"
        />
        <NavCard
          heading="Standard"
          image={plan2Img}
          clickedFunction={plan2Function}
          buttonLabel="Go to Pricing"
        />
        <NavCard
          heading="Premium"
          image={plan3Img}
          clickedFunction={plan3Function}
          buttonLabel="Go to Pricing"
        />
      </div>
    </div>
  );
  const customContentResources = (
    <div className="custom-content w-screen m-auto z-0">
      <h3 className="md:text-center mt-5 text-xs sm:text-md md:text-xl font-bold text-purple-900 pl-5 w-3/5 sm:3/4 md:w-full">
        Whether you’re a team of 2 or 2,000, Pro-Go flexible pricing model means
        you only pay for what you need.
      </h3>
      <div className="custom-content w-3/5 md:w-screen flex md:flex-row flex-col gap-5 justify-center items-center my-8 p-5 md:p-0">
        <div className=" rounded-md p-5 flex flex-col  items-center bg-white text-blue-600 shadow-xl hover:shadow-2xl cursor-pointer gap-5 ">
          <button className="text-sm md:text-md w-full m-0 md:m-5 rounded-sm bg-blue-600 hover:bg-blue-400 cursor-pointer text-white p-1 md:p-2">
            FlowFlex Template
          </button>
          <button className="text-sm md:text-md w-full m-0 md:m-5 rounded-sm bg-blue-600 hover:bg-blue-400 cursor-pointer text-white p-1 md:p-2">
            FlowFlex Case Study
          </button>
          <button className="text-sm md:text-md w-full m-0 md:m-5 rounded-sm bg-blue-600 hover:bg-blue-400 cursor-pointer text-white p-1 md:p-2">
            FlowFlex Devloper
          </button>
          <button className="text-sm md:text-md w-full m-0 md:m-5 rounded-sm bg-blue-600 hover:bg-blue-400 cursor-pointer text-white p-1 md:p-2">
            FlowFlex Costumer Service
          </button>
        </div>
        <div>
          <img src={resources1Img} className="w-96"></img>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="navbar flex w-full justify-between fixed bg-purple-800 text-white px-8 py-2 items-center z-50 ">
      <div>
        <img src={logo} className="icon h-16" alt="Logo" />
      </div>
      <div className="navbar-header md:hidden block">
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="navbar-menu flex justify-evenly sm:items-center flex-col absolute sm:right-2 right-0 gap-8 md:gap-5 lg:gap-10 p-5 top-20  md:bg-purple-800 text-lg md:static md:flex-row  md:p-0   bg-black  items-start"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.li
              className="navbar-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#">Home</a>
            </motion.li>

            <Dropdown
              title="Solutions"
              customContent={customContentSolutions}
              setIsDropdownOpen={props.setIsDropdownOpen}
            />

            <Dropdown
              title="Plans"
              customContent={customContentPlans}
              setIsDropdownOpen={props.setIsDropdownOpen}
            />

            <Dropdown
              title="Resources"
              customContent={customContentResources}
              setIsDropdownOpen={props.setIsDropdownOpen}
            />

            {authToken ? (
              <>
                <motion.li
                  className="navbar-item"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/setting">Setting</a>
                </motion.li>
                <motion.li
                  className="navbar-item"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="bg-white rounded-lg p-2 text-purple-800"
                    onClick={() => {
                      navigate("/hellouser");
                    }}
                  >
                    Hello User !!
                  </button>
                </motion.li>
                <motion.li
                  className="navbar-item items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="/profile">
                    <img
                      src={userPhoto}
                      className="h-14 w-14 rounded-full"
                      alt="Profile Photo"
                    />
                  </a>
                </motion.li>
              </>
            ) : (
              <div className="gap-8 items-start md:gap-5 lg:gap-10 flex flex-col md:flex-row">
                <motion.li
                  className="navbar-item"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="btn-signin border-2 p-2  rounded-lg bg-white text-purple-800 w-full"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </button>
                </motion.li>
                <motion.li
                  className="navbar-item"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    className="btn-signup border-white border-2 p-2 rounded-lg"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </button>
                </motion.li>
              </div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
