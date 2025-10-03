import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { Outlet} from "react-router-dom";

function AuthLayout({ image, title, description }) {


  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 pt-10 md:pt-16">
        {/* Left side */}
        <div className=" bg-tertiary text-white flex-col p-16 pb-40  md:p-8 lg:p-12  relative">
          <div className="flex flex-col items-center justify-center max-w-3xl m-auto sticky top-20">
            {title && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium   md:mb-6 text-center">
                {title}
              </h1>
            )}

            {image && (
              <img
                src={image}
                alt="Auth"
                className="max-w-xs md:max-w-sm lg:max-w-md absolute md:relative -bottom-80  md:bottom-0 "
              />
            )}

            {description && (
              <p className="text-lg md:text-xl lg:text-2xl font-light mt-4 text-center">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center justify-centre h-full p-4 pt-40 pb-10 md:py-8 lg:py-10  ">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AuthLayout;
