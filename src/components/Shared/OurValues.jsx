import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHeart, FaLeaf, FaClock } from "react-icons/fa";

const OurValues = () => {
  const values = [
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Fresh & Quality",
      description:
        "We source the freshest ingredients from local farms and trusted suppliers to ensure every meal meets our high standards.",
      color: "text-green-600",
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "Fast Delivery",
      description:
        "Lightning-fast delivery service ensuring your meals arrive hot, fresh, and exactly when you need them.",
      color: "text-blue-600",
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We go above and beyond to make sure every experience exceeds expectations.",
      color: "text-red-500",
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community Focus",
      description:
        "Supporting local restaurants and building stronger communities through food that brings people together.",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-semibold capitalize">Our Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center border border-white/20 group"
            >
              <div
                className={`${value.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
