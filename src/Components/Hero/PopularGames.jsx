import React, { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router";

const PopularGames = ({ data }) => {
  const [popularData, setPopularData] = useState([]);

  useEffect(() => {
    const popular = data.filter((d) => {
      return parseFloat(d.ratings) >= 4.5;
    });
    setPopularData(popular);
  }, [data]);

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 items-center gap-3 md:gap-5">
        {popularData.map((game) => (
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-center"
            key={game.id}
          >
            <Link to={`/gameDetails/${game.id}`} className="bg-base-300 p-4 w-74 min-h-43 md:min-h-48 lg:min-h-56 max-h-56 flex flex-col justify-between gap-3 rounded-xl">
              <img
                className="rounded-2xl max-h-35"
                src={game.coverPhoto}
                alt=""
              />
              <div className="">
                <h2>{game.title}</h2>
                <p className="text-xs md:text-sm flex items-center gap-1">
                  <MdOutlineStarPurple500 /> {game.ratings}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
