import landing1 from "../assets/welcome/illustrations/landing1.svg";
import landing2 from "../assets/welcome/illustrations/landing2.svg";
import landing3 from "../assets/welcome/illustrations/landing3.svg";
import box1 from "../assets/welcome/illustrations/box1.svg";
import box2 from "../assets/welcome/illustrations/box2.svg";
import box3 from "../assets/welcome/illustrations/box3.svg";
import box4 from "../assets/welcome/illustrations/box4.svg";
import box5 from "../assets/welcome/illustrations/box5.svg";
import box6 from "../assets/welcome/illustrations/box6.svg";
import InfoCard from "../utils/welcome/card/InfoCard";
import FeatureCard from "../utils/welcome/card/FeatureCard";
import Heart from "../assets/welcome/icons/heart.svg";
import Team from "../assets/welcome/icons/team.svg";
import Plant from "../assets/welcome/icons/plant.svg";
import Folder from "../assets/welcome/icons/folder.svg";
export default function Welcome() {
  return (
    <>
      <section className="w-full flex flex-col items-center text-center relative ">
        {/* Top Colored Section */}
        <div className="relative w-full bg-tertiary flex flex-col items-center  text-white font-bold p-4 md:p-8  pb-10 md:pb-20 pt-20  md:!pt-40 lg:!pt-16 h-[30rem] md:h-[40rem]">
          <div className="max-w-4xl flex flex-col items-center gap-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
              Pro-Go brings all your tasks, teammates, and tools together
            </h1>
            <p className="text-lg md:text-xl text-center">
              Keep everything in the same place—even if your team isn't.
            </p>

            <a
              href="/signup"
              className="mt-4 px-6 md:px-8 py-3 md:py-4 bg-white text-tertiary rounded-lg text-lg md:text-xl font-medium border shadow-md
        hover:bg-tertiary hover:text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 z-50"
            >
              Start 14-Day Free Trial
            </a>
          </div>

          {/* Image overlapping bottom */}
          <div className="w-full flex justify-center">
            <img
              src={landing1}
              alt="Landing"
              className=" object-cover rounded-lg  relative bottom-[0rem] max-w-xl w-4/5 sm:w-2/3 md:w-2/3 lg:w-full"
            />
          </div>
        </div>

        {/* Bottom White Section */}
        <div className="w-full flex flex-col items-center justify-center mt-12 md:mt-24 px-4 pt-20 md:pt-40 z-50 ">
          <div className="max-w-4xl flex flex-col items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-tertiary">
              One less thing to worry about
            </h3>
            <p className="text-lg md:text-xl text-secondary text-center ">
              Your free Pro-Go account gets you access to all this and more...
            </p>
          </div>
        </div>

        <ul className="w-full grid grid-cols-2 gap-2 md:gap-8 p-4 max-w-7xl mx-auto">
          <InfoCard
            content="A user-friendly dashboard built for you not ,not your accountant."
            img={Heart}
          ></InfoCard>
          <InfoCard
            content="Peace of mind that you're organized ahead of tax season."
            img={Folder}
          ></InfoCard>
          <InfoCard
            content="A complete picture of your business health,wherever you are."
            img={Plant}
          ></InfoCard>
          <InfoCard
            content="Our in house team of bookkeeping ,managing and payroll coaches."
            img={Team}
          ></InfoCard>
        </ul>
      </section>

      <section className="flex flex-col-reverse md:grid  md:grid-cols-2 items-center gap-6 md:gap-12 p-4 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
            A Productivity Powerhouse
          </h2>
          <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed">
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who's doing what and what needs to get
            done. Learn more in our guide for getting started.
          </p>
          <a
            href="/guide"
            className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-md 
                 hover:bg-secondary hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
          >
            Get Started
          </a>
        </div>

        <div className="flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={landing2}
            alt="Productivity"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-xl object-cover"
          />
        </div>

        <h3 className="text-tertiary text-2xl text-center col-span-2 ">
          What will you get in Free trails?
        </h3>
      </section>
      <section className="bg-tertiary text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={landing3}
              alt="Usage"
              className="w-full max-w-sm rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* Center Text */}
          <div className="flex flex-col items-center md:items-center text-center space-y-6">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              How to use it and add members?
            </h3>
            <a
              href="/more"
              className="px-6 py-3 bg-white text-tertiary font-semibold rounded-full shadow-md 
                   hover:bg-secondary hover:text-white hover:shadow-lg transition-all duration-300"
            >
              Tell me more
            </a>
          </div>

          {/* Right List */}
          <ul className="flex flex-col justify-between h-full  text-center">
            {[
              { title: "Onboarding", label: "Free" },
              { title: "Assign task", label: "Free" },
              { title: "Payments", label: "PAY-PER-USE" },
              { title: "Receipts", label: "MONTHLY OR EARLY" },
              { title: "Re-payment", label: "MONTHLY" },
              { title: "Advisor", label: "PICK A PLAN" },
            ].map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-5  gap-4 border-b border-white text-lg md:text-xl font-semibold"
              >
                <span className="col-span-2 text-left">{item.title}</span>
                <span className="mt-1 col-span-3 text-tertiary bg-white rounded-sm px-4 py-1 ">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section classname="">
        <h3 className="text-tertiary text-2xl text-center col-span-2 p-4 md:py-10  max-w-7xl mx-auto">
          WORKFLOWS FOR ANY PROJECT BIG OR SMALL
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 p-4 gap-4 md:gap-8 justify-items-center items-start max-w-7xl m-auto">
          <FeatureCard
            title="WORKSPACE"
            img={box1}
            description="Create and send professional invoices in minutes."
          ></FeatureCard>
          <FeatureCard
            title="SELF-EMPLOYED"
            img={box2}
            description="Pay your staff (and yourself!) with confidence."
          ></FeatureCard>
          <FeatureCard
            title="MEET FEATURE"
            img={box3}
            description="Set up recurring portable and easy meetings with clients."
          ></FeatureCard>
          <FeatureCard
            title="TASK MANAGEMENT"
            img={box4}
            description="Track your team’s assign task with our easy tracking tools."
          ></FeatureCard>
          <FeatureCard
            title="CONSULTANTS"
            img={box5}
            description="Set up recurring invoices and payments for retainer clients."
          ></FeatureCard>
          <FeatureCard
            title="STAY ON TOP OF TASKS"
            img={box6}
            description="Create and send task to other team members in minutes."
          ></FeatureCard>
        </ul>
      </section>
      <section className="p-4">
        <div className="max-w-6xl mx-auto rounded-lg border border-tertiary bg-white text-tertiary flex flex-col md:flex-row justify-between items-center p-6 md:p-10 my-12 md:my-24 gap-6 shadow-md ">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-center md:text-left">
            No need to start from scratch. Jump-start your workflow with a
            proven playbook designed for different teams.
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2047ce] to-[#38a8ae]">
              {" "}
              Customize it to make it yours.
            </span>
          </h3>

          <button className="text-white px-6 py-3 bg-tertiary rounded-full font-medium shadow-md hover:shadow-lg hover:bg-tertiary/90 transition-all duration-300 min-w-[20vw] cursor-pointer">
            Let’s do this
          </button>
        </div>
        <div className="max-w-7xl mx-auto text-center py-16 px-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-6 tracking-tight">
            See work in a whole new way
          </h3>

          <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed px-2">
            View your team’s projects from every angle and bring a fresh
            perspective to the task at hand.
          </p>

          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-tertiary px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-tertiary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Discover all views</span>
          </button>
        </div>
      </section>
    </>
  );
}
