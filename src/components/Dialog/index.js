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
  const [chosenFilm, setChosenFilm] = React.useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const getChosen = async () => {
    const response = await Tmdb.getMovieInfo(filmChosen.id, filmChosen.type);
    setChosenFilm(response);
  };
  React.useEffect(() => {
    if (filmChosen) {
      getChosen();
      setOpen(true);
    }
  }, [filmChosen]);

  let firstDate = new Date();
  let genres = [];
  if (chosenFilm) {
    firstDate = new Date(
      chosenFilm.first_air_date
        ? chosenFilm.first_air_date
        : chosenFilm.release_date
    );
    for (let i in chosenFilm.genres) {
      genres.push(chosenFilm.genres[i].name);
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
      {!chosenFilm && <CircularProgress />}
      {chosenFilm && (
        <div className="dialog">
          <DialogTitle id="scroll-dialog-title" className="close">
            <div className="featured--name">
              {chosenFilm.name ? chosenFilm.name : chosenFilm.title}
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
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${chosenFilm.backdrop_path})`,
                }}
              >
                <div className="featured--vertical">
                  <div className="featured--horizontal">
                    <div className="featured--buttons1">
                      <a
                        className="featured--watchButton"
                        href={`/watch/${chosenFilm.id}`}
                      >
                        ▶ Play
                      </a>
                      <a
                        className="featured--myListButton"
                        href={`/list/add/${chosenFilm.id}`}
                      >
                        + My List
                      </a>
                    </div>
                    <div className="featured--genres">
                      <strong>Genres: </strong>
                      {genres.join(", ")}
                    </div>
                    <div className="featured--info">
                      <div className="featured--points">
                        {chosenFilm.vote_average} points
                      </div>
                      <div className="featured--year1">
                        {firstDate.getFullYear()}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="featured--description1">
                {chosenFilm.overview}
              </div>
            </DialogContentText>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
export default React.memo(CustomDialog);
