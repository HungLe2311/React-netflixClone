import React, { useEffect, useState, useContext } from "react";
import Tmdb from "../../Tmdb";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import NetflixContext from "../../context";
import "../../App.css";

export default () => {
  const [trendingList, setTrendingList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const { searchValue, createSearchList, setFilmChosen } =
    useContext(NetflixContext);

  useEffect(() => {
    const loadTrending = async () => {
      /* nhận danh sách phim Trending */
      let list = await Tmdb.getTrending();
      setTrendingList(list);
      /* chọn ngẫu nhiên phim Featured */
      let randomChosen = Math.floor(
        Math.random() * (list[0].items.results.length - 1)
      );
      let chosen = list[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "movie");
      setFeaturedData(chosenInfo);
    };
    loadTrending();
  }, []);

  return !searchValue.isSearch ? (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {trendingList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      {trendingList.length <= 0 && (
        <div className="loading">
          <img
            src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
            alt="Carregando..."
          />
        </div>
      )}
    </div>
  ) : (
    <div className="search-mode">
      {createSearchList(trendingList).map((item, key) => (
        <div
          key={key}
          className="movieRow--item"
          onClick={() =>
            setFilmChosen({
              id: item.id,
              type: item.name ? "tv" : "movie",
            })
          }
        >
          <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
        </div>
      ))}
    </div>
  );
};
