import SolutionCard from "../../utils/welcome/card/SolutionCard";
import PlanCard from "../../utils/welcome/card/PlanCard";
import Solution1 from "../../assets/navbar/illustrations/solution1.svg";
import Solution2 from "../../assets/navbar/illustrations/solution2.svg";
import Solution3 from "../../assets/navbar/illustrations/solution3.svg";
import Resource1 from "../../assets/navbar/illustrations/resource1.svg";
import Plan1 from "../../assets/navbar/illustrations/plan1.svg";
import Plan2 from "../../assets/navbar/illustrations/plan2.svg";
import Plan3 from "../../assets/navbar/illustrations/plan3.svg";
export default function NavbarDropDown({ type }) {
  if (type === "solutions") {
    return (
      <div className="p-2 md:p-4 !pb-20 bg-white rounded-md max-w-7xl m-auto">
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4">
          Take a page out of these pre-built Flow Flex playbooks{" "}
          <span className="text-[#2047ce]">designed for all teams </span>{" "}
        </h3>
        <ul className="mt-2 grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full m-auto lg:px-16 ">
          <SolutionCard
            title="Flow Flex For Marketing Teams"
            image={Solution1}
            content="Whether launching a product, campaign, or content, Flow Flex helps marketing teams worldwide organize, plan, and deliver."
          ></SolutionCard>

          <SolutionCard
            title="Flow Flex For Design Teams"
            image={Solution2}
            content="From creative brainstorms to the final touches, discover how Flow Flex helps your design teams deliver with style."
          ></SolutionCard>

          <SolutionCard
            title="Flow Flex For Remote Teams"
            image={Solution3}
            content="From brainstorming to project planning, Flow Flex helps remote teams stay connected wherever they are."
          ></SolutionCard>
        </ul>
      </div>
    );
  } else if (type === "plans") {
    return (
      <div className="p-2 md:p-4 !pb-20 bg-white rounded-md max-w-7xl m-auto">
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4">
          Whether you’re a team of 2 or 2,000, Flow Flex flexible pricing model
          means you only{" "}
          <span className="text-[#2047ce]"> pay for what you need. </span>{" "}
        </h3>
        <ul className="mt-2 grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full m-auto lg:px-16 ">
          <PlanCard title="Professional" img={Plan1}></PlanCard>
          <PlanCard title="Standard" img={Plan2}></PlanCard>
          <PlanCard title="Premium" img={Plan3}></PlanCard>
        </ul>
      </div>
    );
  } else if (type === "resources") {
    return (
      <div className="p-2 md:p-4 !pb-20 bg-white rounded-md max-w-7xl m-auto">
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4">
          {" "}
          <span className="text-[#2047ce]">
            {" "}
            Learn, grow, and discover{" "}
          </span>{" "}
          new ways to make the most of Flow Flex.{" "}
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 items-center max-w-7xl mx-auto p-2 md:p-12">
          <ul className="shadow-lg p-4 md:p-8 rounded-xl flex flex-col gap-4 bg-white">
            {[
              "Flow Flex Webinars",
              "Flow Flex Remote",
              "Flow Flex Developer",
              "Flow Flex Customer Stories",
            ].map((item, index) => (
              <li key={index}>
                <button className=" w-full p-2 md:py-3 md:px-6 text-[0.6rem] sm:text-xs md:text-lg font-medium rounded-lg border border-tertiary bg-tertiary text-white shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white hover:text-tertiary hover:scale-[1.02]">
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center">
            <img
              src={Resource1}
              alt="Resource"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  // Default (if no valid prop passed)
  return null;
}
