import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Pages/Home";
import NavbarMenu from "../Components/navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import MovieListPage from "../Pages/MovieList";
import Login from "../Components/Login/Login";
import ProtectRouting from "../Components/protectRouting/ProtectRouting";
import WatchList from "../Pages/WatchList";
import { CartProvider } from "react-use-cart";
import ContactUs from "../Components/ContactUs/ContactUs";

const Approuting = () => {
    const location = useLocation();
    const hideNavbarFooter = location.pathname === "/login";
    return (
        <>


            <CartProvider>
                {!hideNavbarFooter && <NavbarMenu />}

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path="/watchlist"
                            element={
                                <ProtectRouting>
                                    <WatchList />
                                </ProtectRouting>
                            }
                        />



                        <Route path="/movielist" element={<MovieListPage />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                {!hideNavbarFooter && <Footer />}
            </CartProvider>



        </>
    );
};

export default Approuting;
