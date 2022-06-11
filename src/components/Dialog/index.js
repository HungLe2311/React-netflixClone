import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NetflixContext from "../../context";
import "../FeaturedMovie/FeaturedMovie.css";
import Tmdb from "../../Tmdb";
import { CircularProgress } from "@mui/material";
import "./Dialog.css";

function CustomDialog() {
  const [open, setOpen] = useState(false);
  const { filmChosen, setFilmChosen } = useContext(NetflixContext);
  const [chosenFilmInfo, setChosenFilmInfo] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const getChosen = async () => {
    let response = await Tmdb.getMovieInfo(filmChosen.id, filmChosen.type);
    setChosenFilmInfo(response);
  };
  const getRecommendations = async () => {
    let list = await Tmdb.getRecommendations(filmChosen.id, filmChosen.type);
    setRecommendations(list);
    console.log("recommendations", list);
  };
  useEffect(() => {
    if (filmChosen) {
      getChosen();
      setOpen(true);
      getRecommendations();
    }
  }, [filmChosen]);

  let firstDate = new Date();
  let genres = [];
  if (chosenFilmInfo) {
    firstDate = new Date(
      chosenFilmInfo.first_air_date
        ? chosenFilmInfo.first_air_date
        : chosenFilmInfo.release_date
    );
    for (let i in chosenFilmInfo.genres) {
      genres.push(chosenFilmInfo.genres[i].name);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      {!chosenFilmInfo && <CircularProgress />}
      {chosenFilmInfo && (
        <div className="dialog">
          <DialogTitle id="scroll-dialog-title" className="close">
            <div className="featured--name">
              {chosenFilmInfo.name ? chosenFilmInfo.name : chosenFilmInfo.title}
            </div>
            <DialogActions>
              <Button onClick={handleClose}>[Close]</Button>
            </DialogActions>
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <section
                className="featured1"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${chosenFilmInfo.backdrop_path})`,
                }}
              >
                <div className="featured--vertical">
                  <div className="featured--horizontal">
                    <div className="featured--buttons1">
                      <a
                        className="featured--watchButton"
                        href={chosenFilmInfo.homepage}
                        target="_blank"
                      >
                        ▶ Play
                      </a>
                      <a className="featured--myListButton" href="/error">
                        + My List
                      </a>
                    </div>
                    <div className="featured--genres">
                      <strong>Genres: </strong>
                      {genres.join(", ")}
                    </div>
                    <div className="featured--info">
                      <div className="featured--points">
                        {chosenFilmInfo.vote_average} points
                      </div>
                      <div className="featured--year1">
                        {firstDate.getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="featured--description1">
                {chosenFilmInfo.overview}
              </div>

              <div className="recommend">
                <h3>More Like This</h3>
                {recommendations?.results.map((item, key) => (
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
                    <img
                      src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    />
                  </div>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
export default CustomDialog;
