import logo from "../../assets/logo/FFDark.jpg";
import { Twitter, Linkedin, Facebook, Github, Instagram } from "lucide-react";
export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-r from-tertiary to-fourth text-white z-[100000000]">
        <div className="max-w-7xl mx-auto p-6  md:p-2 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-2 lg:gap-8  m-auto">
          {/* Brand Section */}
          <div>
            <a href="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Flow Flex Logo"
                className="w-14 h-14 "
              />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FLOW FLEX
              </h1>
            </a>
             <ul className="flex justify-between items-center py-2 px-1 w-3/4 ">
              <a href="/" className="hover:text-secondary transition">
                <Twitter size={32} />
              </a>
              <a href="/" className="hover:text-secondary transition">
                <Linkedin size={32} />
              </a>
              <a href="/" className="hover:text-secondary transition">
                <Instagram size={32} />
              </a>
              <a href="/" className="hover:text-secondary transition">
                <Facebook size={32} />
              </a>
              <a href="/" className="hover:text-secondary transition">
                <Github size={32} />
              </a>
            </ul>
            <p className="text-sm md:text-base text-gray-200 mb-4 max-w-sm">
              Plan, track, and manage work with clarity—bring teams together to
              achieve more.
            </p>
           
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-2 lg:gap-8">
            <ul className="space-y-2">
              <li>
                <a href="/product" className="hover:text-secondary transition flex justify-center items-center">
                  Product
                </a>
              </li>
              <li>
                <a href="/solution" className="hover:text-secondary transition flex justify-center items-center">
                  Solutions
                </a>
              </li>
              <li>
                <a href="/feature" className="hover:text-secondary transition flex justify-center items-center">
                  Features
                </a>
              </li>
              <li>
                <a href="/tutorial" className="hover:text-secondary transition flex justify-center items-center">
                  Tutorials
                </a>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <a href="/price" className="hover:text-secondary transition flex justify-center items-center">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/rating" className="hover:text-secondary transition flex justify-center items-center">
                  Rating
                </a>
              </li>
              <li>
                <a href="/tutorial" className="hover:text-secondary transition flex justify-center items-center">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base sm:text-sm lg:text-lg mb-3">Stay up to date</h3>
            <form className="flex ">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-secondary bg-white"
              />
              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-r-md hover:bg-secondary transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-6 py-4 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center px-6 ">
          <p>© {new Date().getFullYear()} Flow Flex. All rights reserved.</p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <a href="/term" className="hover:text-secondary transition">
                Terms
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-secondary transition">
                Privacy
              </a>
            </li>
            <li>
              <a href="/cookie" className="hover:text-secondary transition">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* temp remove in end */}
      <div className="bg-primary text-white p-4">Primary BG</div>
      <div className="bg-secondary text-white p-4">Secondary BG</div>
      <div className="bg-tertiary text-white p-4">Tertiary BG</div>
      <div className="bg-fourth text-white p-4">Fourth BG</div>
    </>
  );
}
