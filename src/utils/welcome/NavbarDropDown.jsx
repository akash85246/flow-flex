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
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4">Take a page out of these pre-built Flow Flex playbooks <span className="text-[#2047ce]">designed for all teams </span> </h3>
        <ul className="mt-2 grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full m-auto lg:px-16 ">

        <SolutionCard title="Flow Flex For Marketing Teams" image={Solution1} content="Whether launching a product, campaign, or content, Flow Flex helps marketing teams worldwide organize, plan, and deliver."></SolutionCard>

        <SolutionCard title="Flow Flex For Design Teams" image={Solution2} content="From creative brainstorms to the final touches, discover how Flow Flex helps your design teams deliver with style."></SolutionCard>

        <SolutionCard title="Flow Flex For Remote Teams" image={Solution3} content="From brainstorming to project planning, Flow Flex helps remote teams stay connected wherever they are."></SolutionCard>
        </ul>
      </div>
    );
  } else if (type === "plans") {
    return (
      <div className="p-2 md:p-4 !pb-20 bg-white rounded-md max-w-7xl m-auto">
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4">Whether you’re a team of 2 or 2,000, Flow Flex flexible pricing model means you only <span className="text-[#2047ce]"> pay for what you need. </span> </h3>
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
        <h3 className="font-semibold text-lg  md:text-2xl text-center text-[#001b66] p-2 md:p-4"> <span className="text-[#2047ce]"> Learn, grow, and discover </span> new ways to make the most of Flow Flex. </h3>
        <ul className="mt-2 grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 w-full m-auto lg:px-16 ">
          <PlanCard title="Professional" img={Plan1}></PlanCard>
          <PlanCard title="Standard" img={Plan2}></PlanCard>
          <PlanCard title="Premium" img={Plan3}></PlanCard>
        </ul>
      </div>
    );
  }

  // Default (if no valid prop passed)
  return null;
}