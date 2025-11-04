import React, { useCallback, useEffect, useRef, useState } from "react";
import ErrorPage from "../Shared/ErrorPage";
import Loader from "../Shared/Loader";
import { Link } from "react-router";

const Banner = () => {
  const [carouselImg, setCarouselImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const [hoveredItems, setHoveredItems] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/games.json");
        if (!response.ok) {
          throw new Error(response.error);
        }
        const data = await response.json();
        setCarouselImg(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

  const img = () => {
    if (carouselImg.length > 0) {
      const highRatedGames = carouselImg.filter((details) => {
        return parseFloat(details.ratings) >= 4.9;
      });

      return highRatedGames;
    }
    return [];
  };

  const bannerImg = img();

  const totalSlides = bannerImg.length;

  const scrollCarousel = useCallback(() => {
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      const slideWidth = carouselElement.clientWidth;
      const currentSlide = Math.round(carouselElement.scrollLeft / slideWidth);
      const nextSlide = (currentSlide + 1) % totalSlides;
      const scrollPosition = nextSlide * slideWidth;
      const scrollBehavior =
        nextSlide === 0 && currentSlide === totalSlides - 1
          ? "instant"
          : "smooth";
      carouselElement.scrollTo({
        left: scrollPosition,
        behavior: scrollBehavior,
      });
    }
  }, [totalSlides]);

  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (!isHovering) {
        intervalRef.current = setInterval(scrollCarousel, 2000);
      }
    };
    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    startAutoScroll();
    return () => stopAutoScroll();
  }, [isHovering, scrollCarousel]);
  if (isLoading) {
    return <Loader></Loader>;
  }
  if (error) {
    return <ErrorPage error={error}></ErrorPage>;
  }

  return (
    <div className="md:p-10">
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="carousel md:max-w-[1000px] rounded overflow-x-auto snap-mandatory scroll-smooth flex relative"
      >
        {bannerImg.map((game) => (
          <Link to={`/gameDetails/${game.id}`}
            key={game.id}
            className="carousel-item w-full flex-none relative"
            onMouseEnter={() => setHoveredItems(game.id)}
            onMouseLeave={() => setHoveredItems(null)}
          >
            <img
              src={game.coverPhoto}
              className="w-full object-cover snap-center"
              alt=""
            />
            {hoveredItems === game.id && (
              <div className="absolute inset-0 bg-linear-to-t from-black to-transparent bg-opacity-700 text-white p-4 flex flex-col justify-end pointer-events-none transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                <p className="text-sm line-clamp-3">{game.description}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
