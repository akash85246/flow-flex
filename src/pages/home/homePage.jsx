import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import image1 from "../../assets/home1Img.svg";
import image2 from "../../assets/home2Img.svg";
import image3 from "../../assets/home3Img.svg";
import image4 from "../../assets/home4Img.svg";
import image5 from "../../assets/home5Img.svg";
import image6 from "../../assets/home6Img.svg";
import image7 from "../../assets/home7Img.svg";
import image8 from "../../assets/home8Img.svg";
import image9 from "../../assets/home9Img.svg";
import heartIcon from "../../assets/heartIcon.svg";
import plantIcon from "../../assets/plantIcon.svg";
import fileIcon from "../../assets/fileIcon.svg";
import teamIcon from "../../assets/teamIcon.svg";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import HomeCard from "../../components/cards/homeCard";
export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();

  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.1 });

  // useEffect(() => {
  //   if (inView1) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView1]);

  // useEffect(() => {
  //   if (inView2) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView2]);

  // useEffect(() => {
  //   if (inView3) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView3]);

  // useEffect(() => {
  //   if (inView4) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView4]);

  // useEffect(() => {
  //   if (inView5) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView5]);

  // useEffect(() => {
  //   if (inView6) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView6]);

  // useEffect(() => {
  //   if (inView7) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView7]);

  return (
    <div className="flex flex-col ">
      <Navbar setIsDropdownOpen={setIsDropdownOpen}></Navbar>
      <motion.section className="">
        <div className=" lg:h-[80vh] md:h-[70vh] sm:h-[60vh] h-[50vh] bg-purple-800 w-full mt-20 flex flex-col items-center">
          <h1 className="md:w-1/2 w-3/4 text-center sm:p-5 m-auto md:text-4xl sm:text-xl sm:mt-0 mt-4 text-base font-extrabold text-white">
            FlowFlex brings all your tasks, teammates, and tools together
          </h1>
          <p className="w-3/4 text-center m-auto md:text-lg text-white my-5 sm:text-base text-xs">
            “Keep everything in the same place—even if your team isn&apos;t.”
          </p>
          <button className="bg-white text-purple-800 p-2 md:w-1/4 sm:w-1/2 rounded-sm hover:bg-slate-200 cursor-pointer z-20 sm:text-lg text-sm">
            Start your 14 Day&apos;s Trails
          </button>
          <img src={image1} className="sm:-mt-16 -mt-7"></img>
        </div>
        <div className="md:h-[40vh] sm:h-[35vh] h-[32vh] w-full"></div>
      </motion.section>

      <motion.section
        className="text-center"
        ref={ref1}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-purple-800  md:m-5 sm:-mt-5">
          One less thing to worry about
        </h2>
        <p className="text-md text-purple-600 m-5">
          Your free FlowFlex account gets you access to all this and more:
        </p>
        <div className="grid sm:grid-cols-2 lg:gap-10 md:gap-5  gap-2 md:w-3/5 sm:w-4/5 w-full p-5 m-auto">
          <motion.div
            ref={ref}
            className="flex p-2 gap-4 text-blue-500 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.5 }}
          >
            <img src={heartIcon} alt="Heart Icon" />
            <p>A user-friendly dashboard built for you, not your accountant.</p>
          </motion.div>
          <motion.div
            ref={ref}
            className="flex p-2 md:gap-4 gap-2 text-blue-500 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 1 }}
          >
            <img src={fileIcon} alt="File Icon" />
            <p>
              Peace of mind that you’re always organized ahead of tax season.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            className="flex p-2 gap-4 text-blue-500 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 1.5 }}
          >
            <img src={plantIcon} alt="Plant Icon" />
            <p>A complete picture of your business health, wherever you are.</p>
          </motion.div>
          <motion.div
            ref={ref}
            className="flex p-2 gap-4 text-blue-500 shadow-lg rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 2 }}
          >
            <img src={teamIcon} alt="Team Icon" />
            <p>
              Our in-house team of bookkeeping, managing, and payroll coaches.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="sm:flex justify-evenly gap-1  lg:w-3/4 w-full m-auto mt-10 p-5  sm:p-10"
        ref={ref2}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-lg shadow-lg text-center flex flex-col justify-center items-center p-5">
          <h2 className="text-xl text-purple-800 font-bold ">
            A productivity powerhouse
          </h2>
          <p className="text-lg md:p-10 sm:p-5 p-2 text-purple-600">
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who&apos;s doing what and what needs to
            get done. Learn more in our guide for getting started.
          </p>
        </div>
        <motion.img src={image2} className="md:w-[40vw] sm:w-1/4  " />
      </motion.section>

      <h2 className="m-10 sm:text-xl text-lg text-purple-800 text-center font-bold">
        What will you get in Free trails?
      </h2>

      <motion.section
        className="bg-purple-800 text-white md:grid grid-cols-3 gap-2 p-16 py-0 flex justify-between  flex-col"
        ref={ref3}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <img src={image3} className="object-center md:w-80 w-full h-full"></img>
        <div className="flex flex-col justify-center items-center gap-5 text-lg p-5 text-center">
          <h3>How to use it and add members?</h3>
          <button className="bg-white text-purple-800 p-2 rounded-lg lg:w-1/2 w-2/3  hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
            Tell me more
          </button>
        </div>
        <ul className=" flex flex-col justify-evenly w-full">
          <li className="flex border-b-2 border-purple-600 justify-between p-2">
            <h4>Onboarding</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2   hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Free
            </button>
          </li>
          <li className="flex border-b-2 border-purple-600 justify-between p-2 ">
            <h4>Assign task</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2 hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Free
            </button>
          </li>
          <li className="flex border-b-2 border-purple-600 justify-between p-2">
            <h4>Payments</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2 hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Pay-Per-use
            </button>
          </li>
          <li className="flex border-b-2 border-purple-600 justify-between p-2 gap-2">
            <h4>Receipts</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2 hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Monthly Or Early
            </button>
          </li>
          <li className="flex border-b-2 border-purple-600 justify-between p-2">
            <h4>Re-payment</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2 hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Monthly
            </button>
          </li>
          <li className="flex border-b-2 border-purple-600 justify-between p-2">
            <h4>Advisors</h4>
            <button className="bg-white text-purple-800 p-2 rounded-lg w-1/2 hover:bg-slate-200  lg:text-lg md:text-sm text-xs">
              Pick a plan
            </button>
          </li>
        </ul>
      </motion.section>
      <motion.section
        className="text-center"
        ref={ref4}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl text-purple-800 mt-16 mb-10 font-bold">
          Workflows for any project big or small
        </h2>
        <div className="lg:w-2/3 m-auto sm:grid md:grid-cols-3 grid-cols-2 md:gap-10 gap-5 sm:p-5 sm:w-full w-2/3   flex flex-col">
          <HomeCard
            heading="WORKSPACE"
            image={image4}
            detail="CREATE AND SEND PROFESSIONAL INVOICES IN MINUTES."
          />
          <HomeCard
            heading="SELF-EMPLOYED ENTREPRENEURS"
            image={image5}
            detail="PAY YOUR STAFF (AND YOURSELF!) WITH CONFIDENCE."
          />
          <HomeCard
            heading="MEET FEATURE"
            image={image6}
            detail="SET UP RECURRING PORTABLE AND EASY MEETINGS WITH CLIENTS."
          />
          <HomeCard
            heading="TASK MANAGEMENT"
            image={image7}
            detail="TRACK YOUR TEAM’S ASSIGN TASK WITH OUR EASY TRACKING TOOLS."
          />
          <HomeCard
            heading="CONSULTANTS"
            image={image8}
            detail="SET UP RECURRING INVOICES AND PAYMENTS FOR RETAINER CLIENTS."
          />
          <HomeCard
            heading="STAY ON TOP OF TASKS"
            image={image9}
            detail="CREATE AND SEND TASK TO OTHER TEAM MEMBERS IN MINUTES."
          />
        </div>
      </motion.section>
      <motion.section
        className="border-2 border-purple-800 flex sm:flex-row flex-col justify-between items-center md:w-2/3 md:m-auto md:mt-10 p-5 my-10 md:gap-10 gap-5 m-5"
        ref={ref5}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView5 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <p className="text-purple-500 sm:w-2/4 m-auto text-lg font-semibold">
          No need to start from scratch. Jump-start your workflow with a proven
          playbook designed for different teams. Customize it to make it yours.
        </p>
        <button className="text-white bg-purple-800 p-2 w-1/2 rounded-full">
          Let&apos;s do this
        </button>{" "}
      </motion.section>

      <motion.section
        className="md:w-1/2 p-5 m-auto flex flex-col justify-center items-center gap-5 font-bold text-center"
        ref={ref6}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg text-purple-950">See work in a whole new way</h3>
        <p className="text-md text-purple-600 md:w-2/3 m-auto">
          View your team’s projects from every angle and bring a fresh
          perspective to the task at hand.
        </p>
        <button className="text-white bg-purple-800 p-2 w-1/2 rounded-sm m-auto">
          Discover all views
        </button>
      </motion.section>
      <motion.section
        ref={ref7}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          inView7 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5 }}
      >
        <Footer></Footer>
      </motion.section>
    </div>
  );
}
