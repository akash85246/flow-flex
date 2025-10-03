export default function FeatureCard({ title, description, img }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-2 md:p-6 flex flex-col items-center justify-between text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-secondary w-full max-w-sm h-full md:min-h-[400px]">
      
     
      {title && (
        <h3 className="text-xl md:text-2xl font-semibold text-tertiary mb-2 md:mb-4">
          {title}
        </h3>
      )}
      
     
      {img && (
        <img 
          src={img} 
          alt={title} 
          className="w-40 h-40 md:w-52 md:h-52 object-contain mb-3 md:mb-6"
        />
      )}
      
      
      {description && (
        <p className="text-sm md:text-base text-fourth font-light leading-relaxed px-2">
          {description}
        </p>
      )}
    </div>
  );
}