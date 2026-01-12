import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long does delivery usually take?",
      answer:
        "Our average delivery time is 30-45 minutes, depending on your location and the restaurant's preparation time. We'll provide you with real-time tracking once your order is confirmed.",
    },
    {
      question: "What are your delivery charges?",
      answer:
        "Delivery charges vary by distance and restaurant. Most deliveries range from ৳20-50. Orders above ৳500 often qualify for free delivery from participating restaurants.",
    },
    {
      question: "Can I track my order in real-time?",
      answer:
        "Yes! Once your order is confirmed, you'll receive a tracking link via SMS and email. You can monitor your order from preparation to delivery in real-time.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash on delivery, mobile banking (bKash, Nagad, Rocket), credit/debit cards, and digital wallets. All online payments are secure and encrypted.",
    },
    {
      question: "How do I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 5 minutes of placing it through the app or by calling our support. After preparation begins, modifications may not be possible.",
    },
    {
      question: "What if my food arrives cold or incorrect?",
      answer:
        "We guarantee fresh, hot food delivery. If you're not satisfied, contact us immediately through the app or call support. We'll arrange a replacement or full refund.",
    },
    {
      question: "Do you have vegetarian and dietary options?",
      answer:
        "Yes! We have extensive vegetarian, vegan, gluten-free, and other dietary options. Use our filters to find restaurants that cater to your specific dietary needs.",
    },
    {
      question: "How can I become a partner restaurant?",
      answer:
        "We'd love to partner with you! Visit our 'Partner with Us' page or contact our business team. We provide marketing support, delivery logistics, and growth opportunities.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Frequently Asked Questions

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-semibold capitalize">
            {" "}
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200"
              >
                <h4 className="font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h4>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FaChevronDown className="text-green-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
