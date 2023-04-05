import { Component } from "react";
import MyHeader from "./MyHeader";
import Movie from "./Movie";
import { Spinner } from "react-bootstrap";

class Home extends Component {
  state = {
    Naruto: [],
    StarWars: [],
    OnePiece: [],
    error: false,
    errorMsg: "",
    isLoading: true
  };

  request = async (endpoint, stato) => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        this.setState({ [stato]: data.Search, isLoading: false });
      } else {
        this.setState({ error: true, isLoading: false });
      }
    } catch (error) {
      this.setState({ error: true, errorMsg: error.message, isLoading: false });
    }
  };

  componentDidMount() {
    this.request("http://www.omdbapi.com/?apikey=5f735187&s=naruto&type=movie", "Naruto");
    this.request("https://www.omdbapi.com/?apikey=5f735187&s=star%20wars&type=movie", "StarWars");
    this.request("https://www.omdbapi.com/?apikey=5f735187&s=one%20piece&type=movie", "OnePiece");
  }
  render() {
    return (
      <div className="container-fluid">
        <MyHeader />
        <div className="movie-gallery mx-md-5 mb-5 mt-4">
          <h5 className="text-light mt-2 mb-2">Naruto</h5>
          <div id="trending-now">
            <div className="movie-row">
              {this.state.isLoading && !this.state.error && (
                <div className="text-center">
                  <Spinner id="caricamento" variant="danger" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {this.state.error && !this.state.isLoading && this.state.Naruto.length === 0 && (
                <h5 className="text-center fw-bold text-light">
                  {this.state.errorMsg ? this.state.errorMsg : "Errore nel reperire i dati"}
                </h5>
              )}

              <div className="row g-1 flex-nowrap movie-list py-2">
                {this.state.Naruto.map(movie => (
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
              {this.state.isLoading && !this.state.error && (
                <div className="text-center">
                  <Spinner id="caricamento" variant="danger" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {this.state.error && !this.state.isLoading && this.state.StarWars.length === 0 && (
                <h5 className="text-center fw-bold text-light">
                  {this.state.errorMsg ? this.state.errorMsg : "Errore nel reperire i dati"}
                </h5>
              )}
              <div className="row g-1 flex-nowrap movie-list py-2">
                {this.state.StarWars.map(movie => (
                  <Movie key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="movie-gallery mx-md-5 mb-5 mt-4">
          <h5 className="text-light mt-2 mb-2">Lord of the rings</h5>
          <div id="trending-now">
            <div className="movie-row">
              {this.state.isLoading && !this.state.error && (
                <div className="text-center">
                  <Spinner id="caricamento" variant="danger" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {this.state.error && !this.state.isLoading && this.state.OnePiece.length === 0 && (
                <h5 className="text-center fw-bold text-light">
                  {this.state.errorMsg ? this.state.errorMsg : "Errore nel reperire i dati"}
                </h5>
              )}
              <div className="row g-1 flex-nowrap movie-list py-2">
                {this.state.OnePiece.map(movie => (
                  <Movie key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
