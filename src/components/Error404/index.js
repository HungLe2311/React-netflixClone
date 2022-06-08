import { Link } from "react-router-dom";

function Error404() {
  return (
    <div className="content-404">
      <div>
        <h1>
          <b>OPPS!</b> We Couldn’t Find this Page
        </h1>
        <p>
          Uh... So it looks like you brock something. The page you are looking
          for has up and Vanished.
        </p>
        <h2>
          <Link to="/">Bring me back Home</Link>
        </h2>
      </div>
    </div>
  );
}

export default Error404;
