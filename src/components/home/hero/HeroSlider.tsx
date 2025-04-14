
import { useState, useEffect } from "react";
import { HeroContent } from "./HeroContent";
import { SliderIndicators } from "./SliderIndicators";
import { HeroSlides, Slide } from "./types";

export const slides: HeroSlides = [
  {
    subtitle: "Delivered to Your Doorstep",
    description: "Experience the best quality organic fruits and vegetables delivered fresh from farm to your table.",
    image: "https://images.unsplash.com/photo-1626198226928-85ae4f20a1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    cta: "Shop Now"
  },
  {
    subtitle: "Fresh From The Source",
    description: "Enjoy premium quality meat and fish products that are sourced responsibly and delivered fresh.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    cta: "Explore"
  },
  {
    subtitle: "100% Pure & Natural",
    description: "Our dairy products are made from 100% pure milk, ensuring you get the best quality and taste.",
    image: "https://images.unsplash.com/photo-1628688346399-5a21a76fa7c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    cta: "Discover"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Content */}
      <HeroContent slide={slides[currentSlide]} currentSlide={currentSlide} />
      
      {/* Slider Indicators */}
      <SliderIndicators 
        totalSlides={slides.length} 
        currentSlide={currentSlide} 
        onSelectSlide={setCurrentSlide}
      />
    </section>
  );
};

export default HeroSlider;
