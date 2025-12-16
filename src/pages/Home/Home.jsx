import React from "react";
import Banner from "../../components/Home/Banner";
import Categories from "../../components/Home/Categories";
import Meals from "../../components/Home/Meals/Meals";
import OfferSection from "../../components/Home/OfferSection";
import CustomerReviews from "../../components/Home/CustomerReviews";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[rgb(254_255_203)] bg-opacity-80">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4 py-16 items-center">
          <Banner></Banner>
        </div>
      </section>

      {/* Categories */}
      <Categories></Categories>

      {/* Restaurants */}
      <Meals></Meals>

      {/* Offer */}
      <OfferSection></OfferSection>

      {/* custormer review */}
      <CustomerReviews></CustomerReviews>
    </div>
  );
};

export default Home;
