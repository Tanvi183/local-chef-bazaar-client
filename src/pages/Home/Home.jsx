import Banner from "../../components/Home/Banner";
import Categories from "../../components/Home/Categories";
import Meals from "../../components/Home/Meals/Meals";
import OfferSection from "../../components/Home/OfferSection";
import CustomerReviews from "../../components/Home/CustomerReviews";
import FAQ from "../../components/Home/FAQ";
import BlogSection from "../../components/Home/BlogSection";
import useTitle from "../../hooks/useTitle";
import OurTeams from "../../components/Shared/OurTeams";
import OurValues from "../../components/Shared/OurValues";

const Home = () => {
  useTitle("Home");

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section - First impression with call to action */}
      <section className="bg-[rgb(254_255_203)] dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-90 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4 py-16 items-center">
          <Banner />
        </div>
      </section>

      {/* Categories - Show what we offer immediately after hero */}
      <Categories />

      {/* Our Values - Build trust early with company values */}
      <OurValues />

      {/* Featured Meals - Showcase products after establishing trust */}
      <Meals />

      {/* Special Offers - Create urgency and encourage action */}
      <OfferSection />

      {/* Customer Reviews - Social proof to build confidence */}
      <CustomerReviews />

      {/* Our Team - Humanize the brand */}
      <OurTeams />

      {/* Blog Section - Provide value and establish expertise */}
      <BlogSection />

      {/* FAQ - Address concerns before final decision */}
      <FAQ />
    </div>
  );
};

export default Home;
