import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"; 
import NavbarDropDown from "../../utils/welcome/NavbarDropDown";
import Logo from "../../assets/logo/FF.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");

  const handleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      setDropdownOpen("");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-2  md:p-4 max-w-7xl">
          {/* Logo Section */}
          <a href="/" id="logo" className="flex items-center space-x-2 ">
            <img
              src={Logo}
              alt="Flow Flex Logo"
              className="w-6 h-6 lg:w-10 lg:h-10 rounded-full"
            />
            <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#012e41] to-[#38a8ae] bg-clip-text text-transparent">
              Flow Flex
            </h1>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-2 lg:gap-8 font-medium text-gray-700">
            <li
              className={`hover:text-tertiary cursor-pointer flex items-center ${
                dropdownOpen === "solutions" ? "text-tertiary" : ""
              }`}
              onClick={() =>
                setDropdownOpen(dropdownOpen === "solutions" ? "" : "solutions")
              }
            >
              Solutions
              {dropdownOpen === "solutions" ? <ChevronUp /> : <ChevronDown />}
            </li>

            <li
              className={`hover:text-tertiary cursor-pointer flex items-center ${
                dropdownOpen === "plans" ? "text-tertiary" : ""
              }`}
              onClick={() =>
                setDropdownOpen(dropdownOpen === "plans" ? "" : "plans")
              }
            >
              Plans
              {dropdownOpen === "plans" ? <ChevronUp /> : <ChevronDown />}
            </li>

            <li
              className={`hover:text-tertiary cursor-pointer flex items-center ${
                dropdownOpen === "pricing" ? "text-tertiary" : ""
              }`}
              onClick={() =>
                setDropdownOpen(dropdownOpen === "pricing" ? "" : "pricing")
              }
            >
            <a href="/price">Pricing</a>
            </li>

            <li
              className={`hover:text-tertiary cursor-pointer flex items-center ${
                dropdownOpen === "resources" ? "text-tertiary" : ""
              }`}
              onClick={() =>
                setDropdownOpen(dropdownOpen === "resources" ? "" : "resources")
              }
            >
              Resources
              {dropdownOpen === "resources" ? <ChevronUp /> : <ChevronDown />}
            </li>

            <li className="flex space-x-4">
              <a
                href="/signin"
                className="md:px-2 lg:px-4 lg:py-2 rounded-full border-fourth border-2 text-forth hover:border-blue-500  hover:text-tertiary flex items-center"
              >
                Sign in
              </a>
              <a
                href="/signup"
                className="bg-tertiary text-white px-4 py-2 rounded-full border-fourth border-2 hover:bg-fourth hover:border-blue-800  transition"
              >
                Sign up for free
              </a>
            </li>
          </ul>

          <div className="flex space-x-2 md:hidden">
            <div className="flex space-x-1">
              <a
                href="/signin"
                className="px-4 py-1 rounded-full border-fourth border-2 text-forth   hover:text-tertiary flex justify-center items-center"
              >
                Sign in
              </a>
              <a
                href="/signup"
                className="bg-tertiary text-white px-4 py-1 rounded-full border-fourth border-2  hover:bg-fourth transition text-center max-w-7xl m-auto"
              >
                Sign up
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => handleDropdown(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="flex flex-col space-y-4 p-6 font-medium text-gray-700">
              <li
                className={`hover:text-tertiary cursor-pointer  flex justify-center ${
                  dropdownOpen === "solutions" ? "text-tertiary" : ""
                }`}
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "solutions" ? "" : "solutions"
                  )
                }
              >
                Solutions
                {dropdownOpen === "solutions" ? <ChevronUp /> : <ChevronDown />}
              </li>
              <li
                className={`hover:text-tertiary cursor-pointer flex justify-center ${
                  dropdownOpen === "plans" ? "text-tertiary" : ""
                }`}
                onClick={() =>
                  setDropdownOpen(dropdownOpen === "plans" ? "" : "plans")
                }
              >
                Plans{" "}
                {dropdownOpen === "plans" ? <ChevronUp /> : <ChevronDown />}
              </li>

              <li
                className={`hover:text-tertiary cursor-pointer flex justify-center ${
                  dropdownOpen === "pricing" ? "text-tertiary" : ""
                }`}
                onClick={() =>
                  setDropdownOpen(dropdownOpen === "pricing" ? "" : "pricing")
                }
              >
                Pricing
              </li>

              <li
                className={`hover:text-tertiary cursor-pointer flex justify-center ${
                  dropdownOpen === "resources" ? "text-tertiary" : ""
                }`}
                onClick={() =>
                  setDropdownOpen(
                    dropdownOpen === "resources" ? "" : "resources"
                  )
                }
              >
                Resources
                {dropdownOpen === "resources" ? <ChevronUp /> : <ChevronDown />}
              </li>
            </ul>
          </div>
        )}

         <NavbarDropDown type={dropdownOpen} />
      </nav>
     
    </>
  );
}
