import React, { useEffect, useState } from "react";
import Tmdb from "../../Tmdb";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import Header from "../Header";
import "../../App.css";
export default () => {
  const [trendingList, setTrendingList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBalckHeader] = useState(false);

  useEffect(() => {
    const loadTrending = async () => {
      /* nhận danh sách phim Trending */
      let list = await Tmdb.getTrending();
      setTrendingList(list);
      console.log("trendingList", list);
      /* chọn ngẫu nhiên phim Featured */
      let randomChoosen = Math.floor(
        Math.random() * (list[0].items.results.length - 1)
      );
      console.log(randomChoosen);
      let choosen = list[0].items.results[randomChoosen];
      let choosenInfo = await Tmdb.getMovieInfo(choosen.id, "movie");
      setFeaturedData(choosenInfo);
      console.log("info fetch từ listTrending", choosen);
      console.log("info fetch riêng", choosenInfo);
    };
    loadTrending();
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
      <Header black={blackHeader} />

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
  );
};
