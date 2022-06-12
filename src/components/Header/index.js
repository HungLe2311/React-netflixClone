import React, { useContext } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import NetflixContext from "../../context";

export default ({ black }) => {
  const { searchValue, setSearchValue } = useContext(NetflixContext);

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
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/trending" activeclassname="active">
            Trending
          </NavLink>
        </div>
        <div>
          <NavLink activeclassname="active" to="/movies">
            Movies
          </NavLink>
        </div>
        <div>
          <NavLink activeclassname="active" to="/tvshows">
            TV Shows
          </NavLink>
        </div>
      </div>
      <div>
        <input
          className="search_box"
          onChange={(e) => {
            // handleSearchChange(e.target.value);
            setSearchValue({ value: e.target.value });
          }}
          type="text"
          placeholder="Search"
          value={searchValue.value}
        />
      </div>
      {/* <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User"
          />
        </a>
      </div> */}
    </header>
  );
};
