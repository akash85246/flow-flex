import boardIcon from "../../assets/boardIcon.png";
import boardsIcon from "../../assets/boardsIcon.png";
import trendIcon from "../../assets/trendIcon.png";
import overviewIcon from "../../assets/overviewIcon.png";
import feedbackIcon from "../../assets/feedbackIcon.png";
import activityIcon from "../../assets/activityLogIcon.png";
import { motion } from "framer-motion";
export default function Tasks() {
  return (
    <div className="p-5 shadow-lg sm:w-96 w-full">
      <h1 className="text-lg text-purple-800 p-2 font-semibold border-0 border-b-2 border-purple-800">
        What&apos;s more
      </h1>
      <ul className="flex flex-col h-full w-full sm:gap-0 gap-5  p-2 justify-evenly">
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={boardIcon}></img>
          <p> Add new board </p>
        </motion.li>
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={feedbackIcon}></img>
          <p>Feedback</p>
        </motion.li>
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={overviewIcon}></img>
          <p> Sprint Overview</p>
        </motion.li>
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={trendIcon}></img>
          <p> Market trends analysis</p>
        </motion.li>
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={boardsIcon}></img>
          <p> Boards created</p>
        </motion.li>
        <motion.li
          className="shadow-lg p-2 w-full flex justify-between items-center hover:bg-slate-300 cursor-pointer rounded-sm text-lg text-purple-950"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src={activityIcon}></img>
          <p>Activity log </p>
        </motion.li>
      </ul>
    </div>
  );
}
