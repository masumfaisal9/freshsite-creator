
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slide } from "./types";

interface HeroContentProps {
  slide: Slide;
  currentSlide: number;
}

export const HeroContent = ({ slide, currentSlide }: HeroContentProps) => {
  return (
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
            {slide.subtitle}
          </motion.h1>
          
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-white/90 mb-6"
          >
            {slide.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button 
              className="bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-6 rounded-full shadow-lg btn-hover text-lg"
            >
              {slide.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
