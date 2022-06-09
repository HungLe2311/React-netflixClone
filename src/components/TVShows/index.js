import React, { useEffect, useState } from "react";
import Tmdb from "../../Tmdb";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import Header from "../Header";
import "../../App.css";
export default () => {
  const [TVShowsList, setTVShowsList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBalckHeader] = useState(false);

  useEffect(() => {
    const loadTVShows = async () => {
      /* nhận danh sách TV Shows */
      let list = await Tmdb.getTVShows();
      setTVShowsList(list);
      /* chọn ngẫu nhiên phim Featured */
      let randomList = Math.floor(Math.random() * (list.length - 1));
      let randomChosen = Math.floor(
        Math.random() * (list[randomList].items.results.length - 1)
      );
      console.log(randomChosen);
      let chosen = list[randomList].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "movie");
      setFeaturedData(chosenInfo);
    };
    loadTVShows();
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
        {TVShowsList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {TVShowsList.length <= 0 && (
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
