
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-fresh-600 flex items-center">
              <span className="text-3xl mr-1">B</span>
              <span>eFresh</span>
            </Link>
            <p className="text-gray-600 mt-4">
              We provide fresh, organic products delivered straight to your doorstep to help you maintain a healthy lifestyle.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-500 hover:text-fresh-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fresh-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fresh-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-fresh-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/fruits" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Fruits
                </Link>
              </li>
              <li>
                <Link to="/category/vegetables" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/meat" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Meat & Fish
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link to="/category/bakery" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  Bakery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-fresh-600 mt-0.5" />
                <span className="text-gray-600">
                  123 Fresh Street, Green City, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-fresh-600" />
                <a href="tel:+8801234567890" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  +880 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-fresh-600" />
                <a href="mailto:info@befresh.com" className="text-gray-600 hover:text-fresh-600 transition-colors">
                  info@befresh.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2023 BeFresh. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-600 hover:text-fresh-600 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-fresh-600 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
