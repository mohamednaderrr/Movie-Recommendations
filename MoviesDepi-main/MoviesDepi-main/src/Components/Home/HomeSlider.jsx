import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import "./HomeSlider.css";

import { BiDislike, BiLike } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";

// ! Use Cart
import { useCart } from "react-use-cart";

const HomeSlider = ({ content }) => {
    const { addItem, items } = useCart();

    const [movieData, setMovieData] = useState([]);
    const [topRatedData, settopRatedData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});

    const [disabledButtons, setDisabledButtons] = useState({});

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

                const [movieRes, topRatedRes, upcomingRes] = await Promise.all([
                    movieApi,
                    topRatedApi,
                    upcomingApi,
                ]);

                const movieJson = await movieRes.json();
                const topRatedJson = await topRatedRes.json();
                const upcomingJson = await upcomingRes.json();

                setMovieData(movieJson.results);
                settopRatedData(topRatedJson.results);
                setUpcomingData(upcomingJson.results);

                const details = {};

                const allMovies = [
                    ...movieJson.results,
                    ...topRatedJson.results,
                    ...upcomingJson.results
                ];


                const uniqueMovieIds = new Set();
                allMovies.forEach(movie => uniqueMovieIds.add(movie.id));

                
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
        if (content === "Movies") return movieData;
        if (content === "Top Rated") return topRatedData;
        if (content === "Up coming") return upcomingData;
        return [];
    };

    const handleAddToWatchlist = (item) => {
        addItem({ ...item, price: 0 });
        setDisabledButtons((prev) => ({ ...prev, [item.id]: true }));
    };

    return (
        <div className="HomeSlider mt-5">
            <h1 className="text-white fw-bold px-4 py-1 text-uppercase">{content}</h1>
            <Swiper
                className="mySwiper text-center"
                navigation={true}
                modules={[Navigation]}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1244: {
                        slidesPerView: 5,
                    },
                }}
            >
                {getDataByContent()?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="img d-flex flex-column px-1 my-2">
                            <img
                                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                alt="img"
                            />
                            <div className="info">
                                <div className="icons my-2 d-flex text-white align-items-center gap-2">
                                    <a
                                        href={`https://www.themoviedb.org/movie/${item.id}`}
                                        target="_blank"
                                    >
                                        <FaPlay
                                            size={21}
                                            className="border rounded-pill text-white icon "
                                        />
                                    </a>
                                    <FaRegHeart
                                        size={20}
                                        className={`border rounded-pill icon ${items.some(i => i.id === item.id) ? "active" : ""}`}
                                        onClick={() => handleAddToWatchlist(item)}
                                        style={{ cursor: disabledButtons[item.id] || items.some(i => i.id === item.id) ? "not-allowed " : "pointer " }}
                                    />
                                    <BiLike size={21} className="border rounded-pill icon" />
                                    <BiDislike size={21} className="border rounded-pill icon" />
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeSlider;

