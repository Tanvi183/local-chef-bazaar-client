import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/carousel.css";

import coffee from "../../assets/images/coffee (2).png";
import sandwich from "../../assets/images/sandwich.png";
import burger from "../../assets/images/burger.png";
import coldDrink from "../../assets/images/coldDrink.png";
import soup from "../../assets/images/soup.png";

const categories = [
  { name: "Coffee", img: coffee },
  { name: "Sandwich", img: sandwich },
  { name: "Burger", img: burger },
  { name: "Cold Drink", img: coldDrink },
  { name: "Soup", img: soup },
  { name: "Coffee", img: coffee },
  { name: "Sandwich", img: sandwich },
  { name: "Burger", img: burger },
  { name: "Cold Drink", img: coldDrink },
  { name: "Soup", img: soup },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 3,
  },
};

const Categories = () => {
  return (
    <div className="bg-gray-50 py-20">
      <section className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold capitalize mb-10">
          Best Foods For You
        </h3>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2500}
          pauseOnHover={false}
          arrows
          removeArrowOnDeviceType={["tablet", "mobile"]}
          containerClass="pb-4 "
          itemClass="px-3"
        >
          {categories.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-3 group">
              <div className="w-30 h-30 rounded-full bg-gray-100 flex items-center justify-center transition group-hover:bg-green-100">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-30 h-30 object-contain"
                />
              </div>
              <p className="text-sm font-medium group-hover:text-green-600">
                {item.name}
              </p>
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Categories;
