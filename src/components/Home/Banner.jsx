import React from "react";
import { motion } from "framer-motion";
import bannerImg from "../../assets/images/headerHero.jpeg";

const Banner = () => {
  return (
    <>
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center md:text-left mb-8 md:mb-0"
      >
        <h1 className="capitalize text-4xl lg:text-6xl font-extrabold leading-tight text-center lg:text-left text-black lg:pr-4">
          The Best <br />
          <span className="text-primary">Restaurants</span>
          <br />
          In Your Home
        </h1>

        <p className="text-lg text-gray-600 mt-4">
          Get ready for a scrumptious adventure filled with unbeatable offers on
          your favourite foods and restaurants.
        </p>

        <p className="text-lg text-green-600 font-semibold mt-4">
          Healthy Food For A Wealthy Mood
        </p>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="flex justify-center md:justify-end"
      >
        <img
          src={bannerImg}
          alt="Food Delivery"
          className="w-72 sm:w-96 md:w-9/12"
        />
      </motion.div>
    </>
  );
};

export default Banner;
