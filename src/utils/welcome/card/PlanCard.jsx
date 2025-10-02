export default function PlanCard({ title, img }) {
  return (
    <li
      className="bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-xl p-1 sm:p-4 md:p-6 flex flex-col justify-between items-center md:gap-2 lg:gap-4 max-w-sm md:max-w-md mx-auto
                    text-center"
    >
      {/* Title */}
      <h3 className="text-sm  md:text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2047ce] to-[#38a8ae]">
        {title}
      </h3>

      {/* Image */}
      <img
        src={img}
        alt={title}
        className=" w-20 h-20 sm:w-40 md:w-60 sm:h-40 md:h-60 rounded-lg border-blue-200 object-contain"
      />

      {/* Button */}
        <button className="mt-2 md:mt-4 px-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-sm hover:bg-white hover:text-blue-600 border-2 border-blue-600 b transition-colors text-[0.8rem] md:text-sm lg:text-base">
            Go to Pricing
        </button>
    </li>
  );
}
