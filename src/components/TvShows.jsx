import MyHeader from "./MyHeader";
import Movie from "./Movie";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const TvShows = props => {
  const [Avengers, setAvengers] = useState([]);
  const [Twilight, setTwilight] = useState([]);
  const [HarryPotter, setHarryPotter] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const request = async (endpoint, setStato) => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setStato(data.Search);
        setIsLoading(false);
      } else {
        setError(true);
        setIsLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    request("http://www.omdbapi.com/?apikey=5f735187&s=avengers&type=movie", setAvengers);
    request("https://www.omdbapi.com/?apikey=5f735187&s=twilight&type=movie", setTwilight);
    request("https://www.omdbapi.com/?apikey=5f735187&s=harry%20potter&type=movie", setHarryPotter);
  }, []);

  return (
    <div className="container-fluid">
      <MyHeader title={props.title} />
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">Avengers</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && Avengers.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}

            <div className="row g-1 flex-nowrap movie-list py-2">
              {Avengers.map(movie => (
                <Movie imdbID={movie.imdbID} key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">Twilight</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && Twilight.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}
            <div className="row g-1 flex-nowrap movie-list py-2">
              {Twilight.map(movie => (
                <Movie imdbID={movie.imdbID} key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">Harry Potter</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && HarryPotter.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}
            <div className="row g-1 flex-nowrap movie-list py-2">
              {HarryPotter.map(movie => (
                <Movie imdbID={movie.imdbID} key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShows;
