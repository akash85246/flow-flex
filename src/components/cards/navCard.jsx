import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
export default function NavCard(props) {
  return (
    <motion.div
      className=" rounded-md p-5 flex flex-col  items-center bg-white text-blue-600 shadow-xl hover:shadow-2xl cursor-pointer "
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={props.clickedFunction}
    >
      <h3 className="text-xs sm:text-md md:text-xl text-purple-700 font-semibold my-1 sm:my-2">
        {props.heading}
      </h3>
      <img
        src={props.image}
        alt={props.heading}
        className="md:w-64 md:h-64 sm:h-40 sm:w-40 h-32 w-32 rounded-md bg-transparent sm:object-cover"
      />
      <hr className="md:border-b-2 w-full border-black md:px-10 md:m-5 m-2" />
      <p className="md:text-sm text-xs">{props.detail}</p>
      {props.buttonLabel && (
        <button className="text-sm md:text-md w-full m-0 md:m-5 rounded-sm bg-blue-600 hover:bg-blue-400 cursor-pointer text-white p-1 md:p-2">
          {props.buttonLabel}
        </button>
      )}
    </motion.div>
  );
}

// NavCard.propTypes = {
//   heading: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   detail: PropTypes.string.isRequired,
// };
