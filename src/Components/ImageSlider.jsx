import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto h-48 sm:h-64 md:h-80 lg:h-96">
      <div className="relative h-full overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out overflow-hidden ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-sm bg-black/30 text-white hover:bg-black/50 transition-colors duration-300"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={nextSlide} 
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-sm bg-black/30 text-white hover:bg-black/50 transition-colors duration-300"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;