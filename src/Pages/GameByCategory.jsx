import React, { use, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import GameCard from "../Components/PageComponent/GameCard";
import Newsletter from "../Components/Shared/Newsletter";

const categroiesPromise = fetch("/categories.json").then((res) => res.json());

const GamesByCategory = () => {
  const categoryData = use(categroiesPromise);
  const { id } = useParams();
  const data = useLoaderData();
  const [CategoryGames, setCategoryGames] = useState([]);
  useEffect(() => {
    if (id == "0") {
      setCategoryGames(data);
      return;
    } else {
      const filteredGames = data.filter((game) => game.categoryId == id);
      setCategoryGames(filteredGames);
    }
  }, [id, data]);

  const currentCategory = categoryData.find((category) => category.id == id);
  const categoryName = id == "0" ? "All Games" : currentCategory?.name;

  return (
    <div className="w-11/12 mx-auto p-6">
      {categoryName && (
        <h1 className="text-3xl font-bold mb-6  text-center">{categoryName}</h1>
      )}
      {CategoryGames && (
        <div className="flex flex-wrap justify-center gap-6">
        {CategoryGames.map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
      </div>
      )}
      <Newsletter></Newsletter>
    </div>
  );
};

export default GamesByCategory;
