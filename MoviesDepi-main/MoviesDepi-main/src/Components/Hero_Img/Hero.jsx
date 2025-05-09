


import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Info, PlayIcon, Clock } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-fade";


import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Pagination } from 'swiper/modules';
import { PuffLoader } from "react-spinners";
import { FaStar } from "react-icons/fa6";


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

    const GetTrend = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=9ce966a2d7e1bd9ab1cef00c8debcb39");
            const data = await res.json();
            setTrend(data.results);


            const details = {};
            for (const item of data.results) {
                // movies, not TV shows
                if (item.media_type === "movie") {
                    const movieDetail = await fetchMovieDetails(item.id);
                    if (movieDetail) {
                        details[item.id] = {
                            runtime: movieDetail.runtime,
                            vote_average: movieDetail.vote_average
                        };
                    }
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
                                        className="Hero "
                                        onClick={closeIframe}
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original${t.poster_path})`,
                                        }}
                                    >

                                        <div
                                            className={`${showIframe ? "overlay" : "nooverlay"
                                                } additional-class`}
                                        ></div>
                                        {showIframe && (
                                            <iframe
                                                src="https://www.youtube.com/embed/hUUszE29jS0?si=uYnP6ZEnGIylQlT7"
                                                title="YouTube video player"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                                referrerpolicy="strict-origin-when-cross-origin"
                                                allowfullscreen
                                                className="ifram w-full h-96 rounded-lg shadow-lg border z-3 position-absolute "
                                            ></iframe>
                                        )}

                                        <div className="content ms-md-5 container py-2">

                                            <div className="info-top">
                                                <h1 className="title text-uppercase text-white">
                                                    {t.title ? t.title : t.original_name}
                                                </h1>
                                                <div className="info-bottom d-flex align-items-center gap-3 mb-5 ">
                                                    {t.media_type === "movie" && movieDetails[t.id] && (
                                                        <div className=" rating d-flex align-items-center gap-2 w-100 ">
                                                            {movieDetails[t.id].runtime && (
                                                                <div className="d-flex align-items-center text-white me-3">
                                                                    <Clock size={16} className="me-1" />
                                                                    <span>{Math.floor(movieDetails[t.id].runtime / 60)}h {movieDetails[t.id].runtime % 60}m</span>
                                                                </div>
                                                            )}
                                                            <div className="d-flex align-items-center justify-content-center text-white">
                                                                <span className="me-1 mb-1 star"><FaStar /></span>
                                                                <span>{movieDetails[t.id].vote_average?.toFixed(1)}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="desc text-white ">{t.overview}</div>
                                                <div className="buttons d-flex gap-3 pt-4">
                                                    <div
                                                        className="d-flex gap-1 align-items-center btn btn-outline-success text-white position-relative z-3"
                                                        onClick={toggleIframe}
                                                    >

                                                        <span className="fw-semibold play">
                                                            {!showIframe ? (
                                                                <span>
                                                                    <PlayIcon size={18} /> {"Play"}
                                                                </span>
                                                            ) : (
                                                                "Close"
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="d-flex gap-1 align-items-center btn btn-outline-secondary text-white">
                                                        <span>

                                                            <Info size={18} />
                                                        </span>
                                                        <span className="fw-semibold info"> Info </span>
                                                    </div>
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
