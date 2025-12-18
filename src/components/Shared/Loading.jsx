import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

const Loading = () => {
  // Create a smooth bouncing animation
  const bounce = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (1) {
        await next({ transform: "scale(1.3)" });
        await next({ transform: "scale(1)" });
      }
    },
    config: config.wobbly,
  });

  // Create a fade + spin effect for the ring
  const rotate = useSpring({
    from: { rotateZ: 0 },
    to: async (next) => {
      while (1) {
        await next({ rotateZ: 360 });
      }
    },
    config: { duration: 2000 },
    loop: true,
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Animated ring */}
      <animated.div
        style={{
          ...rotate,
        }}
        className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full"
      />

      {/* Animated text */}
      <animated.div
        style={bounce}
        className="mt-6 text-2xl font-semibold text-gray-700 tracking-wider"
      >
        Loading...
      </animated.div>
    </div>
  );
};

export default Loading;
