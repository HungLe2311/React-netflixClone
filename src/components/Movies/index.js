import React, { useEffect, useState } from "react";
import Tmdb from "../../Tmdb";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import Header from "../Header";
import "../../App.css";
export default () => {
  const [moviesList, setMoviesList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBalckHeader] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      /* nhận danh sách Movies */
      let list = await Tmdb.getMovies();
      setMoviesList(list);
      /* chọn ngẫu nhiên phim Featured */
      let randomList = Math.floor(Math.random() * (list.length - 1));
      let randomChosen = Math.floor(
        Math.random() * (list[randomList].items.results.length - 1)
      );
      let chosen = list[randomList].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "movie");
      setFeaturedData(chosenInfo);
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBalckHeader(true);
      } else {
        setBalckHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {moviesList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {moviesList.length <= 0 && (
        <div className="loading">
          <img
            src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
            alt="Carregando..."
          />
        </div>
      )}
    </div>
  );
};
