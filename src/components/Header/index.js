import React from "react";
import ScrollDialog from "../Dialog";
import "./Header.css";
import { Link } from "react-router-dom";

export default ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="menu">
        <div className="header--logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1920px-Logonetflix.png"
              alt="Netflix"
            />
          </Link>
        </div>
        <div>
          <Link to="/trending">Trending</Link>
        </div>
        <div>
          <Link to="/movies">Movies</Link>
        </div>
        <div>
          <Link to="/tvshows">TV Shows</Link>
        </div>
        <ScrollDialog />
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User"
          />
        </a>
      </div>
    </header>
  );
};
