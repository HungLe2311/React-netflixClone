import React from "react";
import "./FeaturedMovie.css";
import { useContext } from "react";
import NetflixContext from "../../context";

export default ({ item }) => {
  const { setFilmChosen } = useContext(NetflixContext);
  let firstDate = new Date(
    item.first_air_date ? item.first_air_date : item.release_date
  );
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = item.overview ? item.overview : "";
  if (description.length > 200) {
    description = description.substring(0, 200) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">
            {item.name ? item.name : item.title}
          </div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average} points</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            {/* <div className="featured--seasons">
              {item.number_of_seasons} season
              {item.number_of_seasons !== 1 ? "s" : " "}
            </div> */}
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a
              className="featured--watchButton"
              href={item.homepage}
              target="_blank"
            >
              ▶ Play
            </a>
            <div
              className="featured--myListButton"
              onClick={() =>
                setFilmChosen({
                  id: item.id,
                  type: item.name ? "tv" : "movie",
                })
              }
            >
              + More Info
            </div>
          </div>
          <div className="featured--genres">
            <strong>Genres: </strong>
            {genres.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};
