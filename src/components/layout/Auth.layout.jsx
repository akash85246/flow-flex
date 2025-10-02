import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { Outlet } from "react-router-dom";

function AuthLayout ()  {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar />

      <main className="flex-1">
        {/* This will render the page content based on route */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
