import React, { useEffect, useState, useContext } from "react";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import "../../App.css";
import NetflixContext from "../../context";
import Tmdb from "../../Tmdb";

export default () => {
  const [homeList, setHomeList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const { searchValue, createSearchList, setFilmChosen } =
    useContext(NetflixContext);

  useEffect(() => {
    const loadAll = async () => {
      /* nhận danh sách Home */
      let list = await Tmdb.getHomeList();
      setHomeList(list);
      /* chọn ngẫu nhiên phim Featured */
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results?.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  return !searchValue.isSearch ? (
    <div>
      <div className="page">
        {featuredData && <FeaturedMovie item={featuredData} />}

        <section className="lists">
          {homeList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        {homeList.length <= 0 && (
          <div className="loading">
            <img
              src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
              alt="Carregando..."
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="search-mode">
      {createSearchList(homeList).map((item, key) => (
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
