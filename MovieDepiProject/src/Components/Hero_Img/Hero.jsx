import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { Info, PlayIcon, Clock } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-fade";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Pagination } from 'swiper/modules';
import { PuffLoader } from "react-spinners";

const Hero = () => {
    const [Trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState({});
    // console.log(Trend)

    const [showIframe, setShowIframe] = useState(false);

    const toggleIframe = () => {
        setShowIframe(!showIframe);
    };

    const closeIframe = () => {
        if (showIframe) setShowIframe(false);
    };

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

    const fetchMovieTrailer = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39`);
            if (!response.ok) return null;
            const data = await response.json();
            // Find trailer or teaser
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube") ||
                           data.results.find(video => video.type === "Teaser" && video.site === "YouTube") ||
                           data.results[0];
            return trailer ? trailer.key : null;
        } catch (error) {
            console.error(`Error fetching trailer for movie ${movieId}:`, error);
            return null;
        }
    };

    const GetTrend = async () => {
        try {
            setLoading(true);
            // Using popular movies instead of trending
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39&language=en-US&page=1");
            const data = await res.json();

            // Only take the first 5 movies for better performance
            const topMovies = data.results.slice(0, 5);
            setTrend(topMovies);

            // Fetch additional details for movies
            const details = {};
            for (const movie of topMovies) {
                const movieDetail = await fetchMovieDetails(movie.id);
                const trailerKey = await fetchMovieTrailer(movie.id);

                if (movieDetail) {
                    details[movie.id] = {
                        runtime: movieDetail.runtime,
                        vote_average: movieDetail.vote_average,
                        trailerKey: trailerKey
                    };
                }
            }
            setMovieDetails(details);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetTrend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <div className="loading text-white d-flex justify-content-center align-items-center ">
                    <div className="load">
                        <PuffLoader color="#ff0000" />
                    </div>
                </div>
            ) : (
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    modules={[EffectFade, Pagination]}
                    className="mySwiper"
                >
                    {Trend?.map((t) => {
                        return (
                            <>
                                <SwiperSlide key={t.id}>
                                    <div
                                        className="Hero"
                                        onClick={closeIframe}
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original${t.backdrop_path})`,
                                        }}
                                    >
                                        {/* Gradient overlay for better text readability */}
                                        <div className="hero-gradient-overlay"></div>

                                        {/* Full overlay when iframe is shown */}
                                        <div
                                            className={`${showIframe ? "overlay" : ""}`}
                                        ></div>

                                        {showIframe && movieDetails[t.id]?.trailerKey && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '90%',
                                                maxWidth: '900px',
                                                zIndex: 10
                                            }}>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${movieDetails[t.id].trailerKey}?autoplay=1`}
                                                    title={`${t.title} trailer`}

                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    className="rounded-lg shadow-lg"
                                                    style={{
                                                        width: '100%',
                                                        height: window.innerWidth <= 576 ? '250px' :
                                                                window.innerWidth <= 768 ? '350px' :
                                                                window.innerWidth <= 1150 ? '400px' : '500px',
                                                        border: 'none'
                                                    }}
                                                ></iframe>
                                            </div>
                                        )}

                                        <div className="content ms-md-5 container py-4 position-relative" style={{ zIndex: 2 }}>
                                            <div className="info-bottom">
                                                <h1 className="title text-uppercase text-white">
                                                    {t.title}
                                                </h1>

                                                <div className="info-top d-flex align-items-center gap-3 mb-4">
                                                    {movieDetails[t.id] && (
                                                        <div className="rating d-flex align-items-center gap-3">
                                                            {movieDetails[t.id].runtime && (
                                                                <div className="d-flex align-items-center text-white me-2 movie-stat">
                                                                    <Clock size={16} className="me-1" />
                                                                    <span>{Math.floor(movieDetails[t.id].runtime / 60)}h {movieDetails[t.id].runtime % 60}m</span>
                                                                </div>
                                                            )}
                                                            {movieDetails[t.id].vote_average && (
                                                                <div className="d-flex align-items-center text-white movie-stat">
                                                                    <span className="me-1">⭐</span>
                                                                    <span>{movieDetails[t.id].vote_average?.toFixed(1)}</span>
                                                                </div>
                                                            )}
                                                            <div className="release-date movie-stat">
                                                                <span>{new Date(t.release_date).getFullYear()}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="desc text-white">{t.overview}</div>

                                                <div className="buttons d-flex gap-3 pt-4">
                                                    {movieDetails[t.id]?.trailerKey ? (
                                                        <div
                                                            className="d-flex gap-1 align-items-center btn btn-danger text-white position-relative"
                                                            onClick={toggleIframe}
                                                        >
                                                            <span className="fw-semibold play">
                                                                {!showIframe ? (
                                                                    <span>
                                                                        <PlayIcon size={18} /> {"Watch Trailer"}
                                                                    </span>
                                                                ) : (
                                                                    "Close"
                                                                )}
                                                            </span>
                                                        </div>
                                                    ) : null}

                                                    <Link to={`/movie/${t.id}`} className="text-decoration-none">
                                                        <div className="d-flex gap-1 align-items-center btn btn-outline-success text-white">
                                                            <span>
                                                                <Info size={18} />
                                                            </span>
                                                            <span className="fw-semibold info"> More Details </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>
                        );
                    })}
                </Swiper>
            )}

        </>
    );
};

export default Hero;
