import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import NavbarMovies from '../Components/Navbar-Movies/navMovies';
import MovieList from '../Components/MovieList/MovieList';

import "./MoviesList.css"

const MovieListPage = () => {
    const location = useLocation();
    const [movieType, setMovieType] = useState(null);

    useEffect(() => {
        // Check if we have a movieType in the location state
        if (location.state && location.state.movieType) {
            setMovieType(location.state.movieType);
        }
    }, [location]);

    return (
        <>
            <div className="movieslist">
                <NavbarMovies setMovieType={setMovieType} movieType={movieType} />
                <MovieList movieType={movieType} />
            </div>
        </>
    )
}

export default MovieListPage;