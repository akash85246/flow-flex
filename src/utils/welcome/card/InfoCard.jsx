export default function InfoCard({ content, img }) {
  return (
    <li
      className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center gap-4 
                   hover:shadow-xl transform hover:scale-105 transition-all duration-300
                   w-full mx-auto"
    >
      <img
        src={img}
        alt="Info"
        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full shadow-sm"
      />
      <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium">
        {content}
      </p>
    </li>
  );
}
