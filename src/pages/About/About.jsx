import { motion } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import useTitle from "../../hooks/useTitle";
import bannerImg from "../../assets/images/headerHero.jpeg";
import { FaUsers, FaHeart, FaLeaf, FaClock, FaTruck, FaStar  } from "react-icons/fa";

const About = () => {
  useTitle("About Us");

  const stats = [
    {
      icon: <FaUsers className="text-3xl" />,
      number: "10K+",
      label: "Happy Customers",
    },
    {
      icon: <FaTruck className="text-3xl" />,
      number: "50K+",
      label: "Orders Delivered",
    },
    {
      icon: <FaStar className="text-3xl" />,
      number: "4.9",
      label: "Average Rating",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      number: "100+",
      label: "Partner Restaurants",
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="bg-[rgb(254_255_203)] bg-opacity-80 py-18">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-primary capitalize text-4xl lg:text-6xl font-extrabold text-center">
              About us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center border border-white/30 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-green-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  LocalChefBazaar was born from a simple idea: everyone deserves
                  access to delicious, fresh food from their favorite local
                  restaurants, delivered right to their doorstep.
                </p>
                <p>
                  Founded in 2020 during challenging times, we saw an
                  opportunity to support local restaurants while providing our
                  community with convenient access to quality meals. What
                  started as a small initiative has grown into a thriving
                  platform connecting thousands of food lovers with hundreds of
                  local eateries.
                </p>
                <p>
                  Today, we're proud to be more than just a delivery service.
                  We're a bridge between passionate chefs and hungry customers,
                  a supporter of local businesses, and a champion of fresh,
                  quality food for everyone.
                </p>
              </div>
            </motion.div>

            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative group"
            >
              <img
                src={bannerImg}
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Fresh Food, Happy People
                </h3>
                <p className="text-green-100">
                  Bringing communities together through food
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
       <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-primary">Our Values</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
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
    </div>
  );
};

export default About;
