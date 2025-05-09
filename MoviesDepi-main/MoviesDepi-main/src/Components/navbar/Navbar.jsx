import "./Navbar.css";
import { useEffect, useState } from "react";

import ReelPath from "../../assets/Images/ReelPath.png";
import { FaGear } from "react-icons/fa6";

import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { BsFillDoorOpenFill } from "react-icons/bs";
import { PiPersonSimpleRunBold } from "react-icons/pi";
import { useCart } from "react-use-cart";

import Avatar from "../../assets/Images/avatar.png"

const NavbarMenu = () => {
    const {
        totalUniqueItems,
        emptyCart
    } = useCart();





    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowOffcanvas(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
        emptyCart();
    };

    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (token) {
            const newAvatarUrl = `https://avatar.iran.liara.run/public`;
            setAvatarUrl(newAvatarUrl);
        }
    }, [token]);


    return (
        <>
            <Navbar
                expand="md"
                className="navbar text-white w-100 h-25 py-2 bg-black sticky-top px-4 "
            >
                <Container fluid className="d-flex ">
                    <Navbar.Brand href="/">
                        <img src={ReelPath} alt="" className="logo " />
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="offcanvasNavbar"
                        onClick={() => setShowOffcanvas(true)}
                    />
                    <Navbar.Offcanvas
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="bg-black text-white "
                    >
                        <Offcanvas.Header closeButton closeVariant="white">
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                <img src={ReelPath} alt="" className="logo  w-50" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="links  me-md-auto d-flex align-md-items-center gap-md-5  gap-4 px-md-2 pb-1 h-100">
                                <Link to="/" className="link">
                                    Home
                                </Link>
                                <Link to="/movielist" className="link">
                                    Movies
                                </Link>
                                <Link to="/watchlist" className="link  justify-content-start">
                                    <div className="up position-relative d-flex ">
                                        <p>Watch List</p>
                                        {totalUniqueItems > 0 && (
                                            <span className="counterwatchlist position-absolute bg-danger d-flex">
                                                {totalUniqueItems}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                                <Link to="/contactus" className="link">
                                    Contact Us
                                </Link>
                            </Nav>
                            <Nav className="mt-4 mt-md-0">
                                <div className="right d-flex flex-md-row flex-column align-items-md-center align-items-start gap-4">
                                    {!isLoggedIn && (
                                        <Link to={"/login"}>
                                            <div className="btn btn-outline-light fw-bold">Login</div>
                                        </Link>
                                    )}
                                    {isLoggedIn && (
                                        <>
                                            <div className="profile">
                                                {/* <img src={Avatar} alt="" className="avatar" /> */}
                                                <img src={avatarUrl ? avatarUrl : Avatar} className="avatar" />
                                            </div>
                                            <div
                                                className="btn btn-outline-danger logout"
                                                onClick={logOut}
                                            >
                                                <span className="person">
                                                    <PiPersonSimpleRunBold />
                                                </span>

                                                <span>
                                                    <BsFillDoorOpenFill />
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarMenu;
