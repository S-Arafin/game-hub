import React, { useRef, useState } from "react";
import Header from "../Components/Shared/Header";
import Hero from "../Pages/Hero";
import Categories from "../Components/Hero/categories";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";
import { motion, useScroll, useTransform } from "motion/react";

const MainLayout = () => {
  // const targetRef = useRef(null);
  // // Track an element as it enters from the bottom
  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  //   offset: ["start end", "end end"],
  // });

  // const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  // const y = useTransform(scrollYProgress, [0, 0], [100, 0]);

  const [showCategories, setShowCategories] = useState(false);
  const handleCategoryClick = () => {
    setShowCategories((show) => !show);
  };
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header handleCategoryClick={handleCategoryClick}></Header>
        {showCategories && 
        <motion.div>
          <Categories></Categories>
        </motion.div>
        
        }
      </div>

      <Hero></Hero>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
