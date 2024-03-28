import { motion } from "framer-motion";
export default function HomeCard(props) {
  return (
    <motion.div
      className="border-purple-950 border-2 md:p-5 p-2 flex flex-col shadow-lg justify-between h-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-purple-800 w-full sm:text-lg text-xl" >{props.heading}</h3>
      <img src={props.image} className="sm:w-full sm:h-full h-64  lg:h-64 lg:object-cover"></img>
      <p className="text-purple-900 w-full md:text-base sm:text-sm text-lg">
        {props.detail}
      </p>
    </motion.div>
  );
}
