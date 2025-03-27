
import { Truck, ShoppingBag, CreditCard, Clock } from "lucide-react";

const processSteps = [
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Select Your Products",
    description: "Browse our wide range of fresh organic products and add them to your cart."
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Easy Payment",
    description: "Secure checkout with multiple payment options for your convenience."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Choose Delivery Time",
    description: "Select your preferred delivery time slot that fits your schedule."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Fast Delivery",
    description: "Receive your fresh products right at your doorstep within the selected time."
  }
];

const Process = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
            Simple Ordering Process
          </h2>
          <p className="text-gray-600 mt-4">
            We've made the ordering process simple and seamless for the best customer experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
              <div className="w-16 h-16 bg-fresh-100 rounded-full flex items-center justify-center mx-auto mb-6 text-fresh-600 group-hover:bg-fresh-600 group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <div className="relative mb-8">
                <div className="text-6xl font-bold text-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 relative z-10">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
