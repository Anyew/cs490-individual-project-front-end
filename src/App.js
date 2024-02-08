import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";


function App() {
	return ( 
		<React.Fragment>
    <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/Customers" element={<Customers />} />
            <Route path="/Reports" element={<Reports />} />
            
          </Routes>
    </Router>
    </React.Fragment>

	);
  const [topFilms, setTopFilms] = useState([]);
  const [topActors, setTopActors] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null); // Track selected film for popup
  const [selectedActor, setSelectedActor] = useState(null); // Track selected actor for popup

 

  useEffect(() => {
    // Fetch data from backend when component mounts
    axios.get('/top_films').then(response => {
        // Update state with fetched data
        setTopFilms(response.data);
      })
      .catch(error => {
        console.error('Error fetching films:', error);
      });

    axios.get('/top_actors').then(response => {
        setTopActors(response.data);
      })
      .catch(error => {
        console.error('Error fetching actors:', error);
      });
  }, []); // Empty dependency array ensures effect runs only once




  // Function to handle click on film title and show popup
  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };
 
  // Function to close popup
  const handleClosePopup = () => {
    setSelectedFilm(null);
  };

  // Function to handle click on actor name and show popup
  const handleActorClick = (actor) => {
    setSelectedActor(actor);
  };

  // Function to close popup
  const handleCloseAPopup = () => {
    setSelectedActor(null);
  };
  



  return (
    <div>
      <div>
        <h1>Top Films</h1>
        {/* Map over the topFilms array and render film information */}
        {topFilms.map((film, index) => (
          <div key={index}>
            <h2 onClick={() => handleFilmClick(film)}>{film.title}</h2>
          </div>
        ))}

        {/* Popup to display film details */}
        {selectedFilm && ( 
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClosePopup}>&times;</span>
              <h2>{selectedFilm.title}</h2>
              <p>Rental Count: {selectedFilm.rental_count}</p>
              <p>Description: {selectedFilm.description}</p>
              <p>Release Year: {selectedFilm.release_year}</p>
              <p>Rating: {selectedFilm.rating}</p>
            </div>
          </div>
        )}
        <br/>
      </div>
       
      <div>
      <h1>Top 5 Actors</h1>
        {/* Map over the topActors array and render actor information */}
        {topActors.map((actor, index) => (
          <div key={index}>
            <h2 onClick={() => handleActorClick(actor)}>{actor.first_name} {actor.last_name} - Film Count: {actor.film_count}</h2>
          </div>
        ))}

        {/* Popup to display film details */}
        {selectedActor && ( 
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleCloseAPopup}>&times;</span>
              <h2>{selectedActor.first_name} {selectedActor.last_name}</h2>
              <p>Top 5 Movies: {selectedActor.rental_count}</p>
            </div>
          </div>
        )}
        
    </div>

      
  </div>  
  );
}

export default App;
