import React from 'react';
import { motion } from "framer-motion";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from 'react-router';

const GameCard = ({game}) => {
    return (
        <Link to={`/gameDetails/${game.id}`}>
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-center"
            key={game.id}
          >
            <div className="bg-base-300 p-4 w-78 min-h-47 md:min-h-52 lg:min-h-60 max-h-60 flex flex-col justify-between gap-3 rounded-xl">
              <img
                className="rounded-2xl max-h-39"
                src={game.coverPhoto}
                alt=""
              />
              <div className="">
                <h2>{game.title}</h2>
                <p className="text-xs md:text-sm flex items-center gap-1">
                  <MdOutlineStarPurple500 /> {game.ratings}
                </p>
              </div>
            </div>
          </motion.div>            
        </Link>
    );
};

export default GameCard;