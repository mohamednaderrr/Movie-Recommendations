import React from 'react';
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className='movie_card'
          >
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.original_title}
              className='movie_poster'
            />
            <div className="movie_details">
              <h3 className='movie_details_heading'>{movie.original_title}</h3>
              <div className="align_center movie_data_rate">
                <p className='move_details_data'>{movie.release_date}</p>
                <p className='movie_rating'>⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
              <p className='movie_description'>
                {movie.overview
                  ? movie.overview.slice(0, 100) + "..."
                  : "No description available."}
              </p>
            </div>
          </a>
  );
};

export default MovieCard;
