import React, { useEffect, useState } from "react";
import Movies from "./components/Movies";
import TVShows from "./components/TVShows";
import TrendingPage from "./components/TrendingPage";
import Header from "./components/Header";
import "./App.css";
import { NetflixProvider } from "./context";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Dialog from "./components/Dialog";
import useDebounce from "./components/Usedebounce";

export default () => {
  const [blackHeader, setBalckHeader] = useState(false);
  const [filmChosen, setFilmChosen] = useState();
  const { pathname } = useLocation();
  let [searchValue, setSearchValue] = useState({
    value: "",
    isSearch: false,
  });

  useEffect(() => {
    setSearchValue({ value: "", isSearch: false });
  }, [pathname]);

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

  const debouncedSearchTerm = useDebounce(searchValue.value, 500);
  useEffect(() => {
    if (debouncedSearchTerm)
      setSearchValue({
        value: debouncedSearchTerm,
        isSearch: true,
      });
    else
      setSearchValue({
        value: debouncedSearchTerm,
        isSearch: false,
      });
  }, [debouncedSearchTerm]);

  let createSearchList = (dataList) => {
    let keySearch = searchValue.value.toLowerCase();
    let tempSearch = [];
    for (let e of dataList) {
      for (let e2 of e.items.results) tempSearch.push(e2);
    }
    let searchList = tempSearch.filter(
      (item) =>
        item.title?.toLowerCase().includes(keySearch) ||
        item.name?.toLowerCase().includes(keySearch)
    );
    return searchList;
  };

  return (
    <NetflixProvider
      value={{
        filmChosen,
        setFilmChosen,
        searchValue,
        setSearchValue,
        createSearchList,
      }}
    >
      <Header black={blackHeader} />
      <Dialog />
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
