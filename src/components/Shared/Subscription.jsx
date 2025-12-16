import React from "react";
import subscribeImg from "../../assets/images/subscribe.png";

const Subscription = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 to-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={subscribeImg}
            alt="Subscribe"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full text-center lg:text-left space-y-10">
          <h2 className="capitalize text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
            Get The Menu Of Your <br />
            <span className="text-primary">Favorite Restaurants</span> Every Day
          </h2>

          {/* Form */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="py-3 px-8 bg-lime-600 text-white hover:bg-lime-700 font-semibold transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
