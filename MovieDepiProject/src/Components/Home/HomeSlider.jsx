import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import "./HomeSlider.css";

import { BiChevronRight, BiDislike, BiLike } from "react-icons/bi";
import { FaRegHeart, FaPlay } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";

// ! Use Cart
import { useCart } from "react-use-cart";

const HomeSlider = ({ content }) => {
    const { addItem, items } = useCart();
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState([]);
    const [topRatedData, setTopRatedData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});

    // Function to fetch movie details
    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39`);
            if (!response.ok) return null;
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching details for movie ${movieId}:`, error);
            return null;
        }
    };

    // console.log(upcomingData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieApi = fetch(
                    "https://api.themoviedb.org/3/movie/now_playing?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39"
                );
                const topRatedApi = fetch(
                    "https://api.themoviedb.org/3/movie/top_rated?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39"
                );
                const upcomingApi = fetch(
                    "https://api.themoviedb.org/3/movie/upcoming?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39"
                );
                const popularApi = fetch(
                    "https://api.themoviedb.org/3/movie/popular?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39"
                );

                const [movieRes, topRatedRes, upcomingRes, popularRes] = await Promise.all([
                    movieApi,
                    topRatedApi,
                    upcomingApi,
                    popularApi
                ]);

                const movieJson = await movieRes.json();
                const topRatedJson = await topRatedRes.json();
                const upcomingJson = await upcomingRes.json();
                const popularJson = await popularRes.json();

                setMovieData(movieJson.results);
                setTopRatedData(topRatedJson.results);
                setUpcomingData(upcomingJson.results);
                setPopularData(popularJson.results);

                // Fetch additional details for movies
                const details = {};

                // Get all unique movie IDs from all four lists
                const allMovies = [
                    ...movieJson.results,
                    ...topRatedJson.results,
                    ...upcomingJson.results,
                    ...popularJson.results
                ];

                // Create a Set to store unique movie IDs
                const uniqueMovieIds = new Set();
                allMovies.forEach(movie => uniqueMovieIds.add(movie.id));

                // Fetch details for each unique movie ID
                for (const movieId of uniqueMovieIds) {
                    const movieDetail = await fetchMovieDetails(movieId);
                    if (movieDetail) {
                        details[movieId] = {
                            runtime: movieDetail.runtime,
                            vote_average: movieDetail.vote_average
                        };
                    }
                }

                setMovieDetails(details);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    const getDataByContent = () => {
        if (content === "Trending") return movieData;
        if (content === "Top Rated") return topRatedData;
        if (content === "Upcoming") return upcomingData;
        if (content === "Popular") return popularData;
        return [];
    };

    const handleAddToWatchlist = (item) => {
        addItem({ ...item, price: 0 });
    };

    return (
        <div className="HomeSlider mt-5">
            <div className="section-header">
                <div className="title-container">
                    <h2 className="section-title">{content}</h2>
                    <div className="title-decoration"></div>
                </div>
                <div
                    className="view-more"
                    onClick={() => {
                        let movieType = "popular"; // Default to popular
                        if (content === "Top Rated") movieType = "topRated";
                        else if (content === "Upcoming") movieType = "upcoming";
                        else if (content === "Popular") movieType = "popular";
                        else if (content === "Trending") movieType = "popular"; // Map Trending to popular
                        navigate("/movielist", { state: { movieType } });
                    }}
                >
                    <span>See All</span>
                    <BiChevronRight size={18} />
                </div>
            </div>
            <Swiper
                className="mySwiper"
                navigation={true}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1244: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    },
                }}
            >
                {getDataByContent()?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/movie/${item.id}`} className="movie-card-link">
                            <div className="img d-flex flex-column px-1 my-2">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                    alt={item.title}
                                />
                                <div className="info">
                                    <div className="icons my-2 d-flex text-white align-items-center gap-2">
                                        <div
                                            className="play-button-wrapper"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaPlay
                                                size={21}
                                                className="border rounded-pill text-white icon"
                                            />
                                        </div>
                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToWatchlist(item);
                                        }}>
                                            <FaRegHeart
                                                size={20}
                                                className={`border rounded-pill icon ${items.some(i => i.id === item.id) ? "active" : ""}`}
                                                style={{ cursor: items.some(i => i.id === item.id) ? "not-allowed" : "pointer" }}
                                            />
                                        </div>
                                        <div onClick={(e) => e.preventDefault()}>
                                            <BiLike size={21} className="border rounded-pill icon" />
                                        </div>
                                        <div onClick={(e) => e.preventDefault()}>
                                            <BiDislike size={21} className="border rounded-pill icon" />
                                        </div>
                                    </div>
                                    <div className="d-flex ">{item.title}</div>
                                    <div className="itemInfoTop d-flex text-white gap-3 align-items-center my-1">
                                        {movieDetails[item.id]?.runtime && (
                                            <div className="d-flex align-items-center">
                                                <FiClock size={14} className="me-1" />
                                                <span>{Math.floor(movieDetails[item.id].runtime / 60)}h {movieDetails[item.id].runtime % 60}m</span>
                                            </div>
                                        )}
                                        {movieDetails[item.id]?.vote_average && (
                                            <div className="d-flex align-items-center">
                                                <FiStar size={14} className="me-1" />
                                                <span>{movieDetails[item.id].vote_average.toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="desc text-start text-white ">
                                        {item.overview.slice(0, 200)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSlider;


