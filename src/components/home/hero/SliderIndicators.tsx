
interface SliderIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
}

export const SliderIndicators = ({ 
  totalSlides, 
  currentSlide, 
  onSelectSlide 
}: SliderIndicatorsProps) => {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
      <div className="flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelectSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-fresh-500 w-10" : "bg-white/50 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
