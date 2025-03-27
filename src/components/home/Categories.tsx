
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "fruits",
    name: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 24,
  },
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 36,
  },
  {
    id: "meat",
    name: "Meat & Fish",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 18,
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0bfaab9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 12,
  },
  {
    id: "bakery",
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 15,
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    count: 20,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
            Shop By Category
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
            Explore Our Categories
          </h2>
          <p className="text-gray-600 mt-4">
            Browse through our carefully selected categories of fresh and organic products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-all duration-300 z-10" />
              
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {category.count} Products
                </p>
                <Link
                  to={`/category/${category.id}`}
                  className="inline-flex items-center text-white bg-fresh-600/90 hover:bg-fresh-600 px-4 py-2 rounded-full text-sm font-medium transition-colors w-fit"
                >
                  Shop Now
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
