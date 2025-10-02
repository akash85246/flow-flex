export default function SolutionCard({ title, image, content }) {
  return (
    <li className="bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-xl p-1 sm:p-4 md:p-6 flex flex-col justify-between items-center md:gap-2 lg:gap-4 max-w-sm md:max-w-md mx-auto
                    text-center">
      
      {/* Title */}
      <h3 className="text-sm  md:text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2047ce] to-[#38a8ae]">
        {title}
      </h3>

      {/* Image */}
      <img 
        src={image} 
        alt={title} 
        className=" w-20 h-20 sm:w-40 md:w-60 sm:h-40 md:h-60 rounded-lg border-blue-200 object-contain"
      />

      {/* Content */}
      <p className="border-t-2 pt-2 text-[0.5rem] md:text-sm text-[#407bff] font-extralight">
        {content}
      </p>
    </li>
  );
}