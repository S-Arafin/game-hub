import React, { use } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const categoryPromise = fetch("/categories.json");

const data = categoryPromise.then((res) => res.json());

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 10 },
};

const Categories = () => {
  const categories = use(data);
  return (
    <motion.div
      className="flex justify-center items-center flex-wrap mx-auto w-11/12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category) => (
        <NavLink key={category.id} to={`/categories/${category.id}`}>
          <motion.div
            key={category.id}
            className="flex items-center bg-base-200 px-20 h-15
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {category.name}
          </motion.div>
        </NavLink>
      ))}
    </motion.div>
  );
};

export default Categories;
