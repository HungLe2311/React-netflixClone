import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import TrendingPage from "./components/TrendingPage";
import Header from "./components/Header";
import "./App.css";
import { NetflixProvider } from "./context";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBalckHeader] = useState(false);
  const [filmChosen, setFilmChosen] = useState();

  useEffect(() => {
    const loadAll = async () => {
      /* nhận danh sách Home */
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      console.log("homeList", list);
      /* chọn ngẫu nhiên phim Featured */
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results?.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
      console.log(chosenInfo);
    };

    loadAll();

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
    <NetflixProvider
      value={{ filmChosen, setFilmChosen, featuredData, movieList }}
    >
      <Header black={blackHeader} />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tvshows" element={<TVShows />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </NetflixProvider>
  );
};
