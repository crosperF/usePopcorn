const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const port = 3000;
// const tempMovieData = [
//     {
//         imdbID: "tt1375666",
//         Title: "Inception",
//         Year: "2010",
//         Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt0133093",
//         Title: "The Matrix",
//         Year: "1999",
//         Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//     },
//     {
//         imdbID: "tt6751668",
//         Title: "Parasite",
//         Year: "2019",
//         Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//     },
// ];

const tempMovieData = [
    {
        imdbID: "tt0120737",
        Title: "The Lord of the Rings: The Fellowship of the Ring",
        Year: 2001,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0167260",
        Title: "The Lord of the Rings: The Two Towers",
        Year: 2002,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0167261",
        Title: "The Lord of the Rings: The Return of the King",
        Year: 2003,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0468569",
        Title: "The Dark Knight",
        Year: 2008,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: 2010,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    // Additional movies (20 total)
    {
        imdbID: "tt0816692",
        Title: "Interstellar",
        Year: 2014,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1843866",
        Title: "Django Unchained",
        Year: 2012,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt2527336",
        Title: "Star Wars: The Last Jedi",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3896198",
        Title: "Guardians of the Galaxy Vol. 2",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1431045",
        Title: "Deadpool",
        Year: 2016,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1392170",
        Title: "The Avengers",
        Year: 2012,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt2488496",
        Title: "Star Wars: The Force Awakens",
        Year: 2015,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3501632",
        Title: "Thor: Ragnarok",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3890160",
        Title: "Logan",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1825683",
        Title: "John Wick",
        Year: 2014,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0407887",
        Title: "Inglourious Basterds",
        Year: 2009,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0468565",
        Title: "The Dark Knight Rises",
        Year: 2012,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    // Additional movies (10 more)
    {
        imdbID: "tt4154756",
        Title: "Avengers: Infinity War",
        Year: 2018,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3504048",
        Title: "Spider-Man: Homecoming",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0109830",
        Title: "Forrest Gump",
        Year: 1994,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0371746",
        Title: "Iron Man",
        Year: 2008,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0316654",
        Title: "The Incredibles",
        Year: 2004,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3890160",
        Title: "The Shape of Water",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt1838556",
        Title: "Silver Linings Playbook",
        Year: 2012,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt0108052",
        Title: "Schindler's List",
        Year: 1993,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt2380307",
        Title: "Blade Runner 2049",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
    {
        imdbID: "tt3504756",
        Title: "Coco",
        Year: 2017,
        Poster: "https://dummyimage.com/200x300&text=poster",
    },
];

app.get("/movies", (req, res) => {
    const { search } = req.query;
    console.log(search);
    let result = tempMovieData.filter((movie) => {
        if (movie.Title.toLowerCase().includes(search.toLowerCase())) {
            return movie;
        }
    });
    console.log(result);
    res.send(result);
});

app.listen(port, () => {
    console.log("app running on server" + port);
});
