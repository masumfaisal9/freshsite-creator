
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// FAQ categories and questions
const faqData = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order through our website by selecting the products you want, adding them to your cart, and proceeding to checkout. You'll need to create an account or log in if you already have one."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 30 minutes of placing it. After that, please contact our customer service team, and they'll assist you based on the order status."
      },
      {
        question: "Is there a minimum order value?",
        answer: "Yes, we have a minimum order value of $10 for standard delivery. Orders below this amount may incur an additional small order fee."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is confirmed, you'll receive a tracking link via email and SMS. You can also track your order in real-time through your account on our website."
      }
    ]
  },
  {
    category: "Delivery",
    questions: [
      {
        question: "What areas do you deliver to?",
        answer: "We currently deliver to all major areas in Dhaka city. You can check if your area is within our delivery zone during checkout."
      },
      {
        question: "How long does delivery take?",
        answer: "Our standard delivery time is within 2-4 hours of placing an order. You can also select a specific delivery time slot that's convenient for you."
      },
      {
        question: "Do you offer same-day delivery?",
        answer: "Yes, we offer same-day delivery for orders placed before 2 PM. Orders placed after that time will be delivered the next day."
      },
      {
        question: "Is there a delivery fee?",
        answer: "We charge a small delivery fee based on your location. Orders above $30 qualify for free delivery within our standard delivery zones."
      }
    ]
  },
  {
    category: "Products",
    questions: [
      {
        question: "Are all your products organic?",
        answer: "Most of our products are organic and certified. Each product page indicates whether the product is organic or conventionally grown. We prioritize organic options whenever possible."
      },
      {
        question: "How do you ensure product quality?",
        answer: "We work directly with trusted farmers and suppliers. Each product undergoes quality checks before being listed on our platform. Our team also conducts regular inspections at source locations."
      },
      {
        question: "What if I receive a damaged or spoiled product?",
        answer: "We have a 'no questions asked' return policy for damaged or spoiled products. Please contact our customer service within 24 hours of delivery, and we'll arrange a refund or replacement."
      },
      {
        question: "Where do your products come from?",
        answer: "We source our products primarily from local farmers and producers in Bangladesh. Some specialty items that can't be grown locally are imported from trusted international partners."
      }
    ]
  },
  {
    category: "Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit/debit cards, mobile banking (bKash, Nagad, Rocket), cash on delivery, and online banking transfers."
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer: "Yes, our payment gateway is secured with SSL encryption. We don't store your credit card information on our servers."
      },
      {
        question: "Can I pay with cash on delivery?",
        answer: "Yes, cash on delivery is available for all areas we serve. Please have the exact amount ready to ensure a smooth transaction."
      },
      {
        question: "When will my card be charged?",
        answer: "Your card will be authorized when you place the order, but it will only be charged when your order is confirmed and processed for delivery."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "If you're not satisfied with the quality of the products, you can request a return or replacement within 24 hours of delivery."
      },
      {
        question: "How do I return a product?",
        answer: "Contact our customer service team through the app, website, or phone. They'll arrange for the return. Please keep the original packaging if possible."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Refunds are processed within 3-5 business days. The time it takes for the amount to reflect in your account depends on your bank or payment provider."
      },
      {
        question: "Do you charge a restocking fee for returns?",
        answer: "No, we don't charge any restocking fees for returns due to quality issues or our errors. However, returns for other reasons may be subject to a small handling fee."
      }
    ]
  }
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Ordering");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{category: string, question: string, answer: string}[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const results = faqData.flatMap(category => 
      category.questions
        .filter(q => 
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(q => ({
          category: category.category,
          question: q.question,
          answer: q.answer
        }))
    );

    setSearchResults(results);
    setIsSearching(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Help Center
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-4">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600 mt-4 md:text-lg">
                Find answers to the most common questions about our services and products.
              </p>
              
              {/* Search */}
              <div className="mt-8 max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-fresh-500 focus:border-fresh-500"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    onClick={handleSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-fresh-600 text-white px-4 py-1 rounded-full hover:bg-fresh-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          {isSearching ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Search Results: {searchResults.length} found
                </h2>
                <Button variant="outline" onClick={clearSearch}>
                  Clear Search
                </Button>
              </div>
              
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {result.question}
                          </h3>
                          <span className="bg-fresh-100 text-fresh-600 text-xs px-2 py-1 rounded-full">
                            {result.category}
                          </span>
                        </div>
                      </div>
                      <div className="px-6 py-4">
                        <p className="text-gray-600">{result.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-800">No results found</h3>
                  <p className="text-gray-600 mt-2">
                    Try different keywords or browse our FAQ categories below.
                  </p>
                  <Button variant="outline" onClick={clearSearch} className="mt-4">
                    Browse All FAQs
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                {faqData.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.category
                        ? "bg-fresh-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
              
              {/* FAQ Accordion */}
              <div className="space-y-6">
                {faqData
                  .find((cat) => cat.category === activeCategory)
                  ?.questions.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer px-6 py-4 hover:bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {faq.question}
                        </h3>
                        <span className="text-fresh-600 font-bold text-xl transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="px-6 py-4 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact CTA Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-8">
                If you couldn't find the answer to your question, feel free to reach out to our customer support team.
              </p>
              <Link to="/contact">
                <Button className="bg-fresh-600 hover:bg-fresh-700 text-white px-8 py-3 rounded-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
