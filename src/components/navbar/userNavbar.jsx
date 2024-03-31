import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  return (
    <nav className="bg-purple-800 text-white w-5 h-5 fixed right-5 p-5 flex justify-center items-center rounded-full top-4">
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="menu-icon">&#9776;</span>
      </button>
      <motion.ul
        className={`navbar-links absolute top-10 -right-0 bg-black p-5 flex flex-col gap-5 ${
          isOpen ? "block" : "hidden"
        }`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </motion.ul>
    </nav>
  );
};

export default Navbar;
