
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string;
  thumbnails?: string[];
  productName: string;
}

const ProductGallery = ({ mainImage, thumbnails = [], productName }: ProductGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  
  // If no thumbnails provided, use main image
  const allImages = thumbnails.length > 0 ? thumbnails : [mainImage];
  
  const nextImage = () => {
    const newIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(newIndex);
    setCurrentImage(allImages[newIndex]);
  };
  
  const prevImage = () => {
    const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(newIndex);
    setCurrentImage(allImages[newIndex]);
  };
  
  const selectImage = (index: number) => {
    setCurrentIndex(index);
    setCurrentImage(allImages[index]);
  };
  
  const toggleZoom = () => {
    setZoomed(!zoomed);
  };
  
  return (
    <div className="product-gallery">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div
          className={`relative ${zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={toggleZoom}
        >
          <img
            src={currentImage}
            alt={productName}
            className={`w-full h-[500px] object-cover rounded-xl transition-transform duration-300 ${
              zoomed ? 'scale-150' : 'scale-100'
            }`}
          />
          <button
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
          >
            <ZoomIn size={18} />
          </button>
        </div>
        
        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-white transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-white transition-colors"
              onClick={nextImage}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                currentIndex === index ? 'border-fresh-600' : 'border-transparent'
              }`}
              onClick={() => selectImage(index)}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
