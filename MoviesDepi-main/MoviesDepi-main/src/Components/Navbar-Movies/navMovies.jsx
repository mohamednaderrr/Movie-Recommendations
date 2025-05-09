import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Navbar-Movies/navMovies.css';

const Navbarmovies = ({ setMovieType }) => {
  const [activeLink, setActiveLink] = useState('popular');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMovieType(link);
    setIsNavOpen(false);
  };

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const links = [
    { key: 'popular', label: 'Popular', icon: 'bi-star-fill' },
    { key: 'topRated', label: 'Top Rated', icon: 'bi-trophy-fill' },
    { key: 'upcoming', label: 'Upcoming', icon: 'bi-calendar2-event-fill' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark   shadow-lg py-4  px-3 ">
      <div className="container-fluid">
        {/* Toggle button (Mobile only) */}
        <button
          className="navbar-toggler d-lg-none ms-auto border-0 bg-black"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isNavOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={handleNavToggle}
        >
          <i className={`bi ${isNavOpen ? 'bi-x-lg' : 'bi-film'} fs-3 text-white`}></i>
        </button>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse  ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav w-100 d-flex flex-column flex-lg-row align-items-lg-center gap-2 pt-3 pt-lg-0">
            {links.map((link) => (
              <li key={link.key} className="nav-item  w-lg-auto text-center">
                <button
                  className={`btn btn-link d-flex justify-content-center justify-content-lg-start align-items-center gap-3 fw-bold fs-5   ${
                    activeLink === link.key ? 'border-bottom text-white' : 'text-white'
                  }`}
                  onClick={() => handleLinkClick(link.key)}
                  style={{
                    border: 'none',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <i className={`bi ${link.icon} fs-4`}></i>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarmovies;
