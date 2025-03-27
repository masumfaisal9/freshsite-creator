
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Award, Leaf, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                About Us
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-4">
                Our Story
              </h1>
              <p className="text-gray-600 mt-4 md:text-lg">
                Learn about our journey in bringing fresh, healthy, and organic products to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                alt="Organic Farm" 
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Our Mission
              </span>
              <h2 className="text-3xl font-bold text-gray-800">
                We're on a mission to provide healthy food to every home
              </h2>
              <p className="text-gray-600">
                Started in 2018, BeFresh was founded with a simple idea: to make fresh, organic, and healthy food accessible to everyone. We believe that good health begins with what you eat, and everyone deserves access to quality food.
              </p>
              <p className="text-gray-600">
                Our team works directly with farmers to source the freshest produce and delivers it straight to your doorstep, eliminating middlemen and ensuring you get the best quality at fair prices.
              </p>
              <div className="pt-4">
                <Link to="/shop">
                  <Button className="bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-6 rounded-full text-lg">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Why Choose Us
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">
                What Sets Us Apart
              </h2>
              <p className="text-gray-600 mt-4">
                We're committed to providing the best possible experience for our customers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "100% Organic",
                  description: "All our products are certified organic and grown without harmful pesticides."
                },
                {
                  icon: <Truck className="w-8 h-8" />,
                  title: "Fast Delivery",
                  description: "We deliver your orders the same day or at your preferred time slot."
                },
                {
                  icon: <CheckCircle2 className="w-8 h-8" />,
                  title: "Quality Assured",
                  description: "Every product undergoes strict quality checks before delivery."
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Best Prices",
                  description: "Direct sourcing from farmers enables us to offer competitive prices."
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
                  <div className="w-16 h-16 bg-fresh-100 rounded-full flex items-center justify-center mx-auto mb-6 text-fresh-600 group-hover:bg-fresh-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
              Our Team
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              Meet The People Behind BeFresh
            </h2>
            <p className="text-gray-600 mt-4">
              Our dedicated team is passionate about bringing healthy food to your table
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "David Chen",
                role: "Head of Operations",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Amina Rahman",
                role: "Chief Nutritionist",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                name: "Michael Lee",
                role: "Farm Relations Manager",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-fresh-600 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 mt-4">
                Don't just take our word for it, hear what our customers have to say
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "BeFresh has transformed how my family eats. The produce is always fresh, and the convenience of delivery makes healthy eating so much easier.",
                  name: "Farid Ahmed",
                  role: "Regular Customer",
                  image: "https://randomuser.me/api/portraits/men/11.jpg"
                },
                {
                  text: "I'm impressed with the quality of the organic produce. Everything is fresh, and the delivery is always on time. Highly recommend!",
                  name: "Nadia Khan",
                  role: "Health Enthusiast",
                  image: "https://randomuser.me/api/portraits/women/26.jpg"
                },
                {
                  text: "The customer service is exceptional. When I had an issue with my order, they resolved it immediately and even sent a complimentary item.",
                  name: "Rafiq Islam",
                  role: "Loyal Customer",
                  image: "https://randomuser.me/api/portraits/men/36.jpg"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-md relative">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="w-10 h-10 bg-fresh-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                      "
                    </div>
                  </div>
                  <p className="text-gray-600 mt-6 mb-6">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="bg-fresh-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to try the BeFresh experience?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have made the switch to healthier eating with our fresh, organic products delivered to their doorstep.
            </p>
            <Link to="/shop">
              <Button className="bg-white text-fresh-600 hover:bg-gray-100 px-8 py-6 rounded-full text-lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
