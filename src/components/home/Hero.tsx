
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

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
      <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex items-center">
        <div className="max-w-3xl">
          <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 text-shadow"
            >
              {slides[currentSlide].subtitle}
            </motion.h1>
            
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-white/90 mb-6"
            >
              {slides[currentSlide].description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button 
                className="bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-6 rounded-full shadow-lg btn-hover text-lg"
              >
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-fresh-500 w-10" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
