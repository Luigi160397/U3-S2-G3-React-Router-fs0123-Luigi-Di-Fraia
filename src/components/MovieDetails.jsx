import { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const request = async endpoint => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
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
    request(`https://www.omdbapi.com/?apikey=5f735187&i=${params.movieId}`);
  }, [params.movieId]);

  return (
    <Container fluid className="text-light">
      {isLoading && !error && (
        <div className="text-center">
          <Spinner id="caricamento" variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && !isLoading && movie.length === 0 && (
        <h5 className="text-center fw-bold text-light">{errorMsg ? errorMsg : "Errore nel reperire i dati"}</h5>
      )}
      <img src={movie.Poster} alt={movie.title} width="100%" style={{ objectFit: "cover", height: "40vh" }} />
      <Row className="justify-content-center gy-5">
        <Col md={10} className="text-center">
          <h2 className="mt-3 display-3">{movie.Title}</h2>
          <p>{movie.Released}</p>
          <p>{movie.Genre}</p>
          <p>
            Ratings:{" "}
            <Badge bg="danger" className="me-1">
              {movie.imdbRating}
            </Badge>
          </p>
          <p>{movie.Plot}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
