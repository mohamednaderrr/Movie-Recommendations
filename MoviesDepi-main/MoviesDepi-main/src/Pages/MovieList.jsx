import React, { useState } from 'react'
import NavbarMovies from '../Components/Navbar-Movies/navMovies';
import MovieList from '../Components/MovieList/MovieList';

import "./MoviesList.css"

const MovieListPage = () => {

    const [movieType, setMovieType] = useState(null);

    return (
        <>
            <div className="movieslist overflow-hidden">
                <NavbarMovies setMovieType={setMovieType} />
                <MovieList movieType={movieType} />
            </div>
        </>
    )
}

export default MovieListPage;