
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Organic farming" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-12 -right-6 sm:right-12 bg-white rounded-2xl p-6 shadow-lg z-20 max-w-xs">
              <div className="flex items-center justify-center w-12 h-12 bg-fresh-100 rounded-full mb-4">
                <span className="text-fresh-600 text-xl font-bold">10+</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-lg mb-2">
                Years of Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Over a decade of delivering fresh, organic products to our valued customers.
              </p>
            </div>
            <div className="absolute -bottom-6 -left-6 sm:left-6 sm:-bottom-6 bg-fresh-500/95 rounded-2xl p-6 shadow-lg z-20 max-w-xs text-white">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="text-sm font-medium">100% Satisfaction</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Customer Happiness
              </h3>
              <p className="text-white/90 text-sm">
                We guarantee the freshness and quality of every product we deliver.
              </p>
            </div>
          </div>
          
          {/* Content Side */}
          <div>
            <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
              About BeFresh
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-6">
              We Provide Only The Best Organic Food For You
            </h2>
            <p className="text-gray-600 mb-6">
              At BeFresh, we're committed to providing you with the freshest, highest-quality organic products. We carefully select each item from trusted local farms and suppliers who share our dedication to sustainable and ethical practices.
            </p>
            <p className="text-gray-600 mb-8">
              Our mission is to make healthy eating accessible to everyone while supporting local communities and protecting the environment. Every product we offer is handpicked to ensure premium quality and exceptional taste.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-fresh-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">100% Organic</h4>
                  <p className="text-gray-600 text-sm">All products are certified organic</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-fresh-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Farm Fresh</h4>
                  <p className="text-gray-600 text-sm">Direct from farms to your table</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-fresh-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Best Quality</h4>
                  <p className="text-gray-600 text-sm">Highest standard of fresh products</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-fresh-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Free Delivery</h4>
                  <p className="text-gray-600 text-sm">On orders over $50</p>
                </div>
              </div>
            </div>
            
            <Button className="bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-6 rounded-full shadow-md btn-hover text-lg">
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
