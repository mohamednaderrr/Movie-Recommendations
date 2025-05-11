import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FiClock, FiCalendar, FiStar, FiDollarSign, FiGlobe, FiPlay, FiLoader } from 'react-icons/fi';
import { FaImdb } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const trailerRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39&append_to_response=videos,similar`
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch credits (cast and crew)
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39`
        );
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);

        // Set videos from the appended response
        if (movieData.videos && movieData.videos.results) {
          setVideos(movieData.videos.results);

          // Find a trailer if available
          const trailer = movieData.videos.results.find(
            video => video.type === 'Trailer' && video.site === 'YouTube'
          );
          if (trailer) {
            setActiveTrailer(trailer);
          }
        }

        // Set similar movies from the appended response
        if (movieData.similar && movieData.similar.results) {
          setSimilarMovies(movieData.similar.results.slice(0, 12));
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get director from crew
  const getDirector = () => {
    if (!credits || !credits.crew) return 'N/A';
    const director = credits.crew.find(person => person.job === 'Director');
    return director ? director.name : 'N/A';
  };

  // Handle trailer click
  const handleTrailerClick = (video) => {
    // If the same video is clicked again, do nothing
    if (activeTrailer && activeTrailer.id === video.id) {
      return;
    }

    // Set loading state
    setIsTrailerLoading(true);

    // Set the active trailer with a slight delay to allow for smooth transition
    setActiveTrailer(null);
    setTimeout(() => {
      setActiveTrailer(video);
    }, 300);

    // Scroll to the video player if it's not already visible
    if (trailerRef.current) {
      trailerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Handle trailer load
  const handleTrailerLoad = () => {
    setIsTrailerLoading(false);
  };

  if (loading) {
    return (
      <Container fluid className="bg-black text-white py-5 min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container fluid className="bg-black text-white py-5 min-vh-100 d-flex justify-content-center align-items-center">
        <h2>Movie not found</h2>
      </Container>
    );
  }

  return (
    <div className="movie-details bg-black text-white">
      {/* Backdrop */}
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
      >
        <div className="backdrop-overlay">
          <Container className="backdrop-content">
            <Row className="align-items-center">
              <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
                <div className="poster-container">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </div>
              </Col>
              <Col md={8}>
                <h1 className="movie-title">{movie.title}</h1>
                {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}

                <div className="movie-meta d-flex flex-wrap gap-4 mb-3">
                  {movie.release_date && (
                    <div className="d-flex align-items-center">
                      <FiCalendar className="me-2" />
                      <span>{formatDate(movie.release_date)}</span>
                    </div>
                  )}
                  {movie.runtime > 0 && (
                    <div className="d-flex align-items-center">
                      <FiClock className="me-2" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                  {movie.vote_average > 0 && (
                    <div className="d-flex align-items-center">
                      <FiStar className="me-2" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="movie-genres mb-3">
                  {movie.genres && movie.genres.map(genre => (
                    <span key={genre.id} className="badge bg-danger me-2 mb-2">{genre.name}</span>
                  ))}
                </div>

                <div className="movie-overview mb-4">
                  <h3>Overview</h3>
                  <p>{movie.overview || 'No overview available.'}</p>
                </div>

                <div className="movie-details-grid mb-4">
                  <div className="detail-item">
                    <strong>Director:</strong> {getDirector()}
                  </div>
                  {movie.budget > 0 && (
                    <div className="detail-item">
                      <strong>Budget:</strong> {formatCurrency(movie.budget)}
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div className="detail-item">
                      <strong>Revenue:</strong> {formatCurrency(movie.revenue)}
                    </div>
                  )}
                  {movie.status && (
                    <div className="detail-item">
                      <strong>Status:</strong> {movie.status}
                    </div>
                  )}
                  {movie.original_language && (
                    <div className="detail-item">
                      <strong>Language:</strong> {movie.original_language.toUpperCase()}
                    </div>
                  )}
                </div>

                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning me-3 mb-3"
                  >
                    <FaImdb className="me-2" size={20} /> View on IMDb
                  </a>
                )}
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mb-3"
                  >
                    <FiGlobe className="me-2" /> Official Website
                  </a>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="py-5">
        {/* Cast Section */}
        {credits && credits.cast && credits.cast.length > 0 && (
          <section className="mb-5">
            <h2 className="section-title mb-4">Cast</h2>
            <Swiper
              className="cast-swiper"
              navigation={true}
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={2}
              loop={false}
              breakpoints={{
                576: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
              
            >
              {credits.cast.slice(0, 18).map(person => (
                <SwiperSlide key={person.id}>
                  <div className="cast-card">
                    <img
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x185?text=No+Image'}
                      alt={person.name}
                      className="cast-image"
                    />
                    <div className="cast-info">
                      <h5 className="cast-name">{person.name}</h5>
                      <p className="cast-character">{person.character}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <section className="mb-5">
            <h2 className="section-title mb-4">Videos</h2>
            <div className="trailer-player mb-4" ref={trailerRef} style={{ margin: '0 auto', maxWidth: '900px' }}>
              {activeTrailer ? (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  {isTrailerLoading && (
                    <div className="trailer-loading">
                      <Spinner animation="border" variant="danger" />
                    </div>
                  )}
                  <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    src={`https://www.youtube.com/embed/${activeTrailer.key}?autoplay=1&rel=0`}
                    title={activeTrailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleTrailerLoad}
                  ></iframe>
                </div>
              ) : (
                <div className="video-placeholder">
                  <div className="placeholder-content">
                    <div className="placeholder-icon">
                      <FiPlay size={40} />
                    </div>
                    <p>Select a video to play</p>
                  </div>
                </div>
              )}
            </div>

            <Swiper
              className="videos-swiper"
              navigation={true}
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              loop={false}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {videos.slice(0, 10).map(video => (
                <SwiperSlide key={video.id}>
                  <div
                    className={`video-thumbnail ${activeTrailer && activeTrailer.id === video.id ? 'active' : ''}`}
                    onClick={() => handleTrailerClick(video)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      alt={video.name}
                    />
                    <div className="video-info">
                      <h6>{video.name}</h6>
                      <span className="video-type">{video.type}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <section>
            <h2 className="section-title mb-4">Similar Movies</h2>
            <Swiper
              className="similar-movies-swiper"
              navigation={true}
              modules={[Navigation, Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={2}
              loop={false}
              breakpoints={{
                576: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
            >
              {similarMovies.map(movie => (
                <SwiperSlide key={movie.id}>
                  <div className="similar-movie-card">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : 'https://via.placeholder.com/342x513?text=No+Image'}
                        alt={movie.title}
                        className="similar-movie-poster"
                      />
                      <div className="similar-movie-info">
                        <h5>{movie.title}</h5>
                        {movie.vote_average > 0 && (
                          <span className="similar-movie-rating">
                            <FiStar className="me-1" /> {movie.vote_average.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )}
      </Container>
    </div>
  );
};

export default MovieDetails;
