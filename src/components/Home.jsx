import MyHeader from "./MyHeader";
import Movie from "./Movie";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const Home = () => {
  const [Naruto, setNaruto] = useState([]);
  const [StarWars, setStarWars] = useState([]);
  const [OnePiece, setOnePiece] = useState([]);
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
    request("http://www.omdbapi.com/?apikey=5f735187&s=naruto&type=movie", setNaruto);
    request("https://www.omdbapi.com/?apikey=5f735187&s=star%20wars&type=movie", setStarWars);
    request("https://www.omdbapi.com/?apikey=5f735187&s=one%20piece&type=movie", setOnePiece);
  }, []);

  return (
    <div className="container-fluid">
      <MyHeader />
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">Naruto</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && Naruto.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}

            <div className="row g-1 flex-nowrap movie-list py-2">
              {Naruto.map(movie => (
                <Movie key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">Star wars</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && StarWars.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}
            <div className="row g-1 flex-nowrap movie-list py-2">
              {StarWars.map(movie => (
                <Movie key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="movie-gallery mx-md-5 mb-5 mt-4">
        <h5 className="text-light mt-2 mb-2">One Piece</h5>
        <div id="trending-now">
          <div className="movie-row">
            {isLoading && !error && (
              <div className="text-center">
                <Spinner id="caricamento" variant="danger" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {error && !isLoading && OnePiece.length === 0 && (
              <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
            )}
            <div className="row g-1 flex-nowrap movie-list py-2">
              {OnePiece.map(movie => (
                <Movie key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
