import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import offerImg from "../../assets/images/offer.png";
import Hamburger from "../../assets/images/burger.png";
import pizza from "../../assets/images/pizza.png";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const slides = [
  {
    title: "Full Menu At  ৳129",
    subtitle: "On delicious delights from Burger King.",
    image: Hamburger,
    brand: "Burger King",
    bg: "from-orange-600 to-orange-300",
  },
  {
    title: "Mega Combo @  ৳199",
    subtitle: "Limited time special offer.",
    image: pizza,
    brand: "Burger King",
    bg: "from-amber-600 to-amber-300",
  },
];

const OfferSection = () => {
  return (
    <section className="bg-[rgb(226,252,255)] bg-opacity-80 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* LEFT SIDE: 1/3 */}
        <div className="flex flex-col items-center text-center lg:col-span-1">
          <div className="relative mb-6">
            <img
              src={offerImg}
              alt="customer"
              className="w-48 sm:w-56 md:w-60 h-48 sm:h-56 md:h-60 rounded-full object-cover"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Amazing Deals & Special Offers <br /> Just For You
          </h2>
        </div>

        {/* RIGHT SIDE (CAROUSEL): 2/3 */}
        <div className="relative lg:col-span-2">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            arrows
            showDots={false}
            containerClass="overflow-visible"
            itemClass="flex justify-center"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${slide.bg} rounded-3xl py-12 px-6 sm:px-8 flex flex-col md:flex-row items-center gap-6 text-white min-h-[300px] sm:min-h-[350px] w-full`}
              >
                {/* TEXT */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                    {slide.title}
                  </h3>
                  <p className="mt-3 text-base sm:text-lg">{slide.subtitle}</p>

                  <button className="mt-6 bg-white text-orange-600 font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-xl shadow">
                    ORDER NOW
                  </button>

                  <p className="text-xs mt-2 opacity-80">T&C apply</p>
                </div>

                {/* IMAGE */}
                <div className="flex-shrink-0 mt-6 md:mt-0">
                  <img
                    src={slide.image}
                    alt="food"
                    className="w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 object-contain"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
