import Navbar from "../board/Navbar";
import Footer from "../board/Footer";
import { Outlet } from "react-router-dom";


function DashboardLayout ()  {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar />

      <main className="flex-1 pt-10 md:pt-16">
        
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
