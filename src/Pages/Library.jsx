import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const getLibrary = () => {
  return JSON.parse(localStorage.getItem("gameLibrary") || "[]");
};

const saveLibrary = (library) => {
  localStorage.setItem("gameLibrary", JSON.stringify(library));
};

const Library = () => {
  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    setMyGames(getLibrary());
  }, []);

  const handleDeleteGame = (gameId, gameName) => {
    const currentLibrary = getLibrary();

    const newLibrary = currentLibrary.filter((game) => game.id !== gameId);

    saveLibrary(newLibrary);

    setMyGames(newLibrary);

    toast.error(`${gameName} removed from your library.`);
  };

  return (
    <div className="w-11/12 mx-auto p-6 min-h-[45rem] ">
      <h1 className="text-4xl font-bold mb-6 text-center">My Library</h1>
        <ToastContainer></ToastContainer>
      {myGames.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">Your library is empty.</p>
          <Link to="/" className="btn btn-primary mt-4">
            Browse Games
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGames.map((game) => (
            <div key={game.id} className="card bg-base-200 shadow-xl">
              <div className="card-body flex-row justify-between items-center p-4">
                <h2 className="card-title text-lg font-bold">{game.name}</h2>
                <div>
                  <button
                    onClick={() => handleDeleteGame(game.id, game.name)}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
