import logo from "../../assets/logo.png";
import linkedInLogo from "../../assets/linkedInIcon.svg";
import dribbleLogo from "../../assets/dribbleIcon.svg";
import xLogo from "../../assets/xIcon.svg";
import facebookLogo from "../../assets/facebookIcon.svg";
import { motion } from "framer-motion";
import InputCard from "../cards/inputCard";
import { useState } from "react";
import { events } from "react-three-fiber";
import LoaderButton from "../../components/buttons/button";
import Button from "../buttons/button";
export default function Footer(props) {
  const [email, setEmail] = useState("");
  const [loading1, setLoading1] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (event) => {
    if (event && event.target) {
      setEmail(event.target.value);
    }
  };
  return (
    <footer className="flex md:grid grid-cols-3 gap-5 bg-purple-950 p-10 text-white text-lg text-center sm:flex-row  flex-col">
      <div className="">
        <img src={logo} className="h-36 m-auto" />
        <div className="flex justify-evenly items-center ">
          <motion.img
            src={xLogo}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.img>
          <motion.img
            src={linkedInLogo}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.img>
          <motion.img
            src={facebookLogo}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.img>
          <motion.img
            src={dribbleLogo}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.img>
        </div>
        <h3 className=" p-2">
          Design amazing digital experiences that create more happy in the
          world.
        </h3>
        <p className="text-sm mt-5 px-2">©2023 Pro-Go. All rights reserved.</p>
      </div>
      <div className="flex justify-between p-5 gap-2 md:gap-0">
        <ul className="flex flex-col gap-2">
          <li className="text-slate-300">Product</li>
          <li className="hover:text-slate-300 cursor-pointer">Solutions</li>
          <li className="hover:text-slate-300 cursor-pointer">Features</li>
          <li className="hover:text-slate-300 cursor-pointer">Tutorials</li>
          <li className="hover:text-slate-300 cursor-pointer">Pricing</li>
        </ul>
        <ul className="flex flex-col gap-2">
          <li className="text-slate-300">Resources</li>
          <li className="hover:text-slate-300 cursor-pointer">Ratings</li>
          <li className="hover:text-slate-300 cursor-pointer">Tutorials</li>
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-10 sm:gap-0">
        <div className="flex justify-center items-center md:flex-row flex-col w-full ">
          <InputCard
            type={"email"}
            label={"Stay up to date"}
            id={"username-input"}
            value={email}
            onChange={handleEmailChange}
            regex={emailRegex}
            setValue={setEmail}
            errorLabel={`Wrong email`}
          />
          <LoaderButton
            label="Sign In"
            class="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded  focus:outline-none focus:shadow-outline w-full mt-5 md:w-[12vw]"
            loading={loading1}
          />
        </div>
        <div className="flex items-end justify-end gap-2 text-sm">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
