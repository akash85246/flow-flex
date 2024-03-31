import { motion } from "framer-motion";
export default function TeamMembersCard(props) {
  return (
    <motion.div
      className="rounded-lg shadow-lg flex flex-col lg:p-2 md:p-1 justify-center items-center w-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={props.image}
        className="h-16 w-16 object-cover rounded-full"
      ></img>
      <h3 className="lg:text-lg md:text-base font-medium text-purple-800">{props.name}</h3>
      <h4 className="lg:text-md md:text-sm text-purple-500">{props.company}</h4>
      <p className="lg:text-sm md:text-xs text-purple-400">{props.position}</p>
    </motion.div>
  );
}
