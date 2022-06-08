import React, { useEffect, useState, useContext } from "react";
import MovieRow from "../MovieRow";
import FeaturedMovie from "../FeaturedMovie";
import "../../App.css";
import NetflixContext from "../../context";

export default () => {
  const { movieList, featuredData } = useContext(NetflixContext);
  return (
    <div>
      <div className="page">
        {/* <Header black={blackHeader} /> */}

        {featuredData && <FeaturedMovie item={featuredData} />}

        <section className="lists">
          {movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        {movieList.length <= 0 && (
          <div className="loading">
            <img
              src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif"
              alt="Carregando..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
