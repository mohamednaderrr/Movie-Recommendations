# MoviesDepi - Movie Browsing Platform

![MoviesDepi Logo](public/favicon.ico)

MoviesDepi is a responsive React-based web application that allows users to browse, search, and save their favorite movies. The application fetches data from The Movie Database (TMDB) API to display trending movies, top-rated films, and upcoming releases.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Movie Browsing**: Browse trending, top-rated, and upcoming movies
- **Movie Details**: View movie ratings, duration, and descriptions
- **Search Functionality**: Search for movies by title
- **User Authentication**: Sign up and log in to access personalized features
- **Watchlist**: Save favorite movies to a personal watchlist
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive UI**: Modern and user-friendly interface with animations

## 🎬 Demo

[Live Demo](#) - Coming soon!

## 🛠️ Technologies Used

- **Frontend Framework**: React 19
- **Routing**: React Router v7
- **State Management**: React Hooks, Context API
- **UI Framework**: Bootstrap 5, React Bootstrap
- **Styling**: CSS, SASS
- **Icons**: React Icons, Bootstrap Icons
- **HTTP Client**: Axios
- **Carousel/Slider**: Swiper
- **Cart/Watchlist Management**: react-use-cart
- **Notifications**: React Toastify
- **Loading Animations**: React Spinners
- **Build Tool**: Vite
- **API**: TMDB (The Movie Database)

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MoviesDepi.git
   cd MoviesDepi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🚀 Usage

### Home Page
The home page displays a hero section with trending movies and multiple sliders for different movie categories:
- Now Playing Movies
- Top Rated Movies
- Upcoming Movies

### Movie List Page
Browse all movies with filtering options:
- Filter by rating
- Sort by highest/lowest rated
- Search by movie title

### Watchlist
Save your favorite movies to watch later (requires authentication).

### Authentication
- Sign up for a new account
- Log in to access your watchlist and personalized features

## 📁 Project Structure

```
MoviesDepi/
├── public/                  # Static files
├── src/
│   ├── assets/              # Images and other assets
│   ├── Components/          # Reusable components
│   │   ├── Footer/          # Footer component
│   │   ├── Hero_Img/        # Hero section component
│   │   ├── Home/            # Home page components
│   │   ├── Login/           # Authentication components
│   │   ├── MovieList/       # Movie listing components
│   │   ├── navbar/          # Navigation components
│   │   └── ...
│   ├── Pages/               # Page components
│   │   ├── Home.jsx         # Home page
│   │   ├── MovieList.jsx    # Movie list page
│   │   ├── WatchList.jsx    # Watchlist page
│   │   └── ...
│   ├── Router/              # Routing configuration
│   ├── App.jsx              # Main App component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   ├── responsive.css       # Responsive design styles
│   └── main.jsx             # Entry point
├── .eslintrc.js             # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 🔌 API Integration

MoviesDepi uses the TMDB (The Movie Database) API to fetch movie data. The following endpoints are used:

- `/trending/all/day` - Get trending movies
- `/movie/now_playing` - Get now playing movies
- `/movie/top_rated` - Get top-rated movies
- `/movie/upcoming` - Get upcoming movies
- `/movie/{movie_id}` - Get detailed information about a specific movie

## 🔐 Authentication

The application includes a complete authentication system:
- User registration
- User login
- Protected routes for authenticated users
- Logout functionality

## 📱 Responsive Design

MoviesDepi is fully responsive and optimized for all device sizes:
- Mobile phones (portrait and landscape)
- Tablets
- Desktops and large screens

The responsive design ensures that the application looks great and functions well on any device.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with ❤️ by [Your Name]
