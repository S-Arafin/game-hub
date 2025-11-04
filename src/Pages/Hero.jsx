import React, { use, useRef } from "react";
import Banner from "../Components/Hero/Banner";
import { motion, useScroll, useTransform } from "motion/react";
import PopularGames from "../Components/Hero/PopularGames";
const gamesPromise = fetch("/games.json").then((res) => res.json());

const Hero = () => {
  const targetRef = useRef(null);
  // Track an element as it enters from the bottom
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const data = use(gamesPromise);
  return (
    <motion.div className="w-11/12 mx-auto">
      <div className="flex flex-col justify-between items-center md:flex-row gap-10 my-10">
        <motion.div
          
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Banner></Banner>
        </motion.div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Most Popular</h1>
          <motion.div
            ref={targetRef}
            style={{ opacity: opacity, y: y }}
            className="max-h-[500px] md:max-h-[400px] lg:max-h-[500px] overflow-y-scroll overflow-x-hidden"
          >
            <PopularGames data={data}></PopularGames>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
