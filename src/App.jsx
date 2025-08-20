import { useState, useEffect } from "react";
import {useDebounce} from 'react-use'
import Search from "./components/search.jsx";
import Spinner from "./components/spinner.jsx";
import Moviecard from "./components/moviecard.jsx";
import { updateSearchCount, getTrendingMovies } from "./lib/appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

//Main app content
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  // Debounce the search term to prevent making too many API requests
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }

      const data = await response.json();
      
      if (data.response == "False") {
        setErrorMessage(
          data.Error || "Something went wrong, Please try again later"
        );
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if(query && data.results && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies:${error}`);
      setErrorMessage("Error fetching movies, Please try again later");
    }finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      
    }
  };

  useEffect(() =>{
    loadTrendingMovies()
  },[]);

  //Fetch movies when the debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You Enjoy WithoutHassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

         {isLoading ? (
         <Spinner/>
         ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
         ) : (
          <ul>
            {movieList.map((movie) => (
              <Moviecard key={movie.id} movie={movie} />
            ))}
          </ul>
         )}
        </section>
      </div>
    </main>
  );
};

export default App;
