import { useEffect, useState } from "react";
import { key } from "./key";

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// Top section
function SearchBar({ query, setQuery }) {
    // const [query, setQuery] = useState("");
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            {children}
        </nav>
    );
}

// main Page section
function Main({ children }) {
    return <main className="main">{children}</main>;
}

// Left section
function ListBox({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

function MoviesList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

function Movie({ movie, onSelectMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

// right section
function WatchedMoviesSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMoviesList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie }) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    );
}

function SelectedMovie({ movieID, onBackClick }) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);

    const {
        Actors: actors,
        Plot: plot,
        imdbRating: imdbRating,
        Year: year,
        Genre: genre,
        Director: director,
        Poster: poster,
        Title: title,
        Released: released,
        Runtime: runtime,
    } = movie;

    useEffect(() => {
        async function fetchMovieDetail(id) {
            setLoading(true);
            let res = await fetch(
                `http://www.omdbapi.com/?apikey=${key}&i=${id}`
            );
            let data = await res.json();
            console.log(data);
            setMovie(data);
            setLoading(false);
        }
        fetchMovieDetail(movieID);
    }, [movieID]); // that is when the incoming prop changes we should also fetch the data
    // not only on mount

    return loading ? (
        <h2 className="loader">Loading...</h2>
    ) : (
        <div className="details">
            <header>
                <button
                    className="btn-back"
                    onClick={() => onBackClick(movieID)}
                >
                    &larr;
                </button>
                <img src={poster} alt={"poster for " + title} />
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>IMDb Rating ⭐ {imdbRating}</p>
                </div>
            </header>
            <section>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState(tempWatchedData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("wars");
    const [selectedMovieID, setSelectedMovieID] = useState(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                // TODO - error handling
                setError(false);
                setLoading(true);
                let res = await fetch(
                    `http://www.omdbapi.com/?apikey=${key}&s=${query}`
                );
                let data = await res.json();

                if (data["Response"] == "False") {
                    setMovies([]);
                    throw new Error("no movies available");
                }
                console.log(data["Search"]);
                setMovies(data["Search"]);
            } catch (err) {
                setError(err.message);
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError(false);
            return;
        }

        fetchMovies();
    }, [query]);

    function SelectMovieHandler(id) {
        setSelectedMovieID((prevID) => (id === prevID ? null : id));
    }

    return (
        <>
            <NavBar>
                <SearchBar
                    query={query}
                    setQuery={(val) => {
                        setQuery(val);
                    }}
                />
                <p className="num-results">
                    Found <strong>{movies.length}</strong> results
                </p>
            </NavBar>

            <Main>
                <ListBox>
                    {!loading && !error && (
                        <MoviesList
                            movies={movies}
                            onSelectMovie={SelectMovieHandler}
                        />
                    )}
                    {loading && <h2 className="loader">Loading...</h2>}
                    {error && <h2 className="error">{error}</h2>}
                </ListBox>
                <ListBox>
                    {selectedMovieID ? (
                        <SelectedMovie
                            movieID={selectedMovieID}
                            onBackClick={SelectMovieHandler}
                        />
                    ) : (
                        <>
                            <WatchedMoviesSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
                        </>
                    )}
                </ListBox>
            </Main>
        </>
    );
}
