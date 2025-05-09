import React, { useEffect, useState, useMemo } from 'react';
import MovieCard from './MovieCard';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import './MovieList.css'; 

const MovieList = ({ movieType }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [ratingRange, setRatingRange] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMovies(movieType);
  }, [movieType]);

  const fetchMovies = async (type) => {
    const totalPages = 9;
    let allFetchedMovies = [];
    let url;

    if (type === 'topRated') {
      url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39';
    } else if (type === 'upcoming') {
      url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39';
    } else {
      url = 'https://api.themoviedb.org/3/movie/popular?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39';
    }

    try {
      for (let page = 1; page <= totalPages; page++) {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();
        allFetchedMovies = [...allFetchedMovies, ...data.results];
      }
      setAllMovies(allFetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = useMemo(() => {
    return allMovies
      .filter((movie) => {
        const title = movie.title.toLowerCase();
        const query = searchQuery.toLowerCase();
        const rating = movie.vote_average;
        const inSearch = query === '' || title.includes(query);
        const inRatingRange =
          !ratingRange || (rating >= ratingRange.min && rating <= ratingRange.max);
        return inSearch && inRatingRange;
      })
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average
      );
  }, [allMovies, ratingRange, sortOrder, searchQuery]);

  const handleFilterClick = (rating) => {
    if (activeFilter === rating) {
      setRatingRange(null);
      setActiveFilter(null);
    } else {
      setRatingRange({ min: rating, max: rating + 0.99 });
      setActiveFilter(rating);
    }
  };

  const handleSeeMore = () => setVisibleCount((prev) => prev + 20);
  const handleSeeLess = () => setVisibleCount(20);

  const ratingFilters = [8, 7, 6];

  const getHeading = () => {
    switch (movieType) {
      case 'topRated':
        return ' Top Rated Movies';
      case 'upcoming':
        return ' Upcoming Movies';
      default:
        return ' Popular Movies';
    }
  };

  return (
    <Container fluid className="bg-black text-light py-5 min-vh-100 bg-danger my-5 overflow-hidden">
      <h2 className="text-center text-danger display-5 fw-bold mb-4">{getHeading()}</h2>

      <Row className="g-3 align-items-center justify-content-center mb-4 px-3">
        {/* Filters */}
        <Col sm={12} md={4}>
          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
            {ratingFilters.map((rating) => (
              <Button
                key={rating}
                variant={activeFilter === rating ? 'danger' : 'outline-light'}
                className={`rounded-pill px-3 fw-semibold filter-btn ${
                  activeFilter === rating ? 'active' : ''
                }`}
                onClick={() => handleFilterClick(rating)}
              >
                {rating}+
              </Button>
            ))}
          </div>
        </Col>

        {/* Sort Order */}
        <Col xs={12} md={4}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-dark text-light border-danger fw-semibold w-100"
          >
            <option value="desc">⭐ Highest Rated</option>
            <option value="asc">⬇️ Lowest Rated</option>
          </Form.Select>
        </Col>

        {/* Search Bar */}
        <Col xs={12} md={4}>
        <Form.Control
          type="text"
          placeholder="🔎 Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-dark text-light border-secondary rounded-pill px-3 w-100 search-input"
        />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <Row className="g-4 justify-content-center">
            {filteredMovies.length > 0 ? (
              filteredMovies.slice(0, visibleCount).map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <p className="text-danger fs-5 text-center">No movies found matching your criteria.</p>
            )}
          </Row>

          {visibleCount < filteredMovies.length && (
            <div className="text-center my-4">
              <Button variant="danger" className="me-2 px-4 fw-bold" onClick={handleSeeMore}>
                Load More
              </Button>
              <Button variant="outline-light" className="px-4" onClick={handleSeeLess}>
                Reset
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default MovieList;
