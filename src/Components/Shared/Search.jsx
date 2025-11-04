import React, { use } from "react";
import { Link } from "react-router";

const gamePromise = fetch("/games.json").then((res) => res.json());

const Search = ({ search }) => {
  const games = use(gamePromise);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="absolute bg-base-100 shadow-lg rounded mt-2 p-2 w-60 z-50">
      {filteredGames.length > 0 ? (
        <div className=" overflow-y-scroll">
          {filteredGames.map((game) => (
            <Link to={`/gameDetails/${game.id}`} key={game.id} className="px-4 py-1 hover:bg-base-300 flex gap-3 items-centers">
                <img className="w-20 h-10" src={game.coverPhoto} alt="" />
              {game.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-1">Game not found</div>
      )}
    </div>
  );
};

export default Search;
