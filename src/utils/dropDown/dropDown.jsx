import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import openArrow from "../../assets/downArrow.svg";
import closeArrow from "../../assets/upArrow.svg";

const Dropdown = ({ title, customContent, setIsDropdownOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsDropdownOpen(!isOpen); // Toggle dropdown state in parent component
  };

  return (
    <div className="dropdown">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="dropdown-toggle flex justify-center items-center gap-3"
        onClick={toggleDropdown}
      >
        <h3>{title}</h3>
        {isOpen ? (
          <span>
            <img src={openArrow} alt="Open Arrow" />
          </span>
        ) : (
          <span>
            <img src={closeArrow} alt="Close Arrow" />
          </span>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul className="dropdown-menu md:absolute md:top-20 md:left-0 right-0  flex w-screen bg-white fixed -z-40 top-20">
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="dropdown-item relative"
            >
              {customContent}
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  customContent: PropTypes.node.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
};

export default Dropdown;
