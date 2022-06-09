import * as React from "react";
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
  const [open, setOpen] = React.useState(false);
  const { filmChosen } = React.useContext(NetflixContext);
  const [chosenFilmInfo, setChosenFilmInfo] = React.useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const getChosen = async () => {
    const response = await Tmdb.getMovieInfo(filmChosen.id, filmChosen.type);
    setChosenFilmInfo(response);
  };
  React.useEffect(() => {
    if (filmChosen) {
      getChosen();
      setOpen(true);
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
            </DialogContentText>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
export default React.memo(CustomDialog);
