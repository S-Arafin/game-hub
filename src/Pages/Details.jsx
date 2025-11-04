import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Components/Shared/Header";
import ErrorPage from "../Components/Shared/ErrorPage";

const getLibrary = () => {
  return JSON.parse(localStorage.getItem("gameLibrary") || "[]");
};

const saveLibrary = (library) => {
  localStorage.setItem("gameLibrary", JSON.stringify(library));
};

const Details = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [games, setGames] = useState({});

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const gameDetails = data.find((game) => game.id == id);
    if (gameDetails) {
      setGames(gameDetails);

      const library = getLibrary();
      const gameExists = library.some(
        (libGame) => libGame.id === gameDetails.id
      );
      setIsInstalled(gameExists);
    }
  }, [data, id]);

  const handleInstallClick = () => {
    if (isInstalled) return;
    toast.success("Installing!!!")

    const library = getLibrary();
    const gameExists = library.some((libGame) => libGame.id === games.id);

    if (!gameExists && games.id) {
      const newGame = {
        id: games.id,
        name: games.title,
      };

      const newLibrary = [...library, newGame];
      saveLibrary(newLibrary);

      setIsInstalled(true);
      toast.success(`${games.title} added to your library!`);
    }
  };

  return (
    <div>
     <Header></Header>
     <ToastContainer/>
      <main className="w-11/12 mx-auto bg-base-200 min-h-screen">
        <div className="px-10 py-5">
          <div>
            <h1 className="text-5xl font-bold my-10">{games.title}</h1>
            <div className=" bg-base-200 min-h-screen">
              <div className=" flex-col lg:flex-row">
                <img
                  src={games.coverPhoto}
                  className="w-[30rem] md:w-[50rem] lg:w-[65rem] rounded-lg shadow-2xl"
                  alt={games.title}
                />
                <div>
                  <p className="py-5 text-xl">
                    Category :{" "}
                    <span className="btn btn-outline btn-primary px-4">
                      {games.category}
                    </span>{" "}
                  </p>
                  <p className="py-5 text-2xl">{games.description}</p>
                  <p className="py-5 text-xl">
                    <span className="font-bold">Developed </span> by{" "}
                    <span className="text-accent">{games.developer}</span>{" "}
                  </p>
                  <p className="py-5 text-lg flex items-center gap-1">
                    Ratings : <span className="font-bold">{games.ratings}</span>{" "}
                    <MdOutlineStarPurple500 />
                  </p>
                  <div className=" flex flex-col gap-5 md:flex-row justify-between ">
                    <button
                      onClick={handleInstallClick}
                      disabled={isInstalled}
                      className="btn btn-primary text-lg "
                    >
                      {isInstalled ? "Installed" : `Get ${games.title}`}
                    </button>

                    <Link
                      to="/"
                      className="btn btn-primary btn-outline text-lg"
                    >
                      <FaArrowLeft /> Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  );
};

export default Details;

