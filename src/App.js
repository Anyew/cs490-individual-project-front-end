import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [topFilms, setTopFilms] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    axios.get('/home_page')
      .then(response => {
        // Update state with fetched data
        setTopFilms(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures effect runs only once

  // Assuming there is at least one film in topFilms array
  const film = topFilms[0] || {};

  return (
    <div>
      <h1>Top Film</h1>
      <div>
        <h2>{film.title}</h2>
        <p>Rental Count: {film.rental_count}</p>
        <p>Description: {film.description}</p>
        <p>Release Year: {film.release_year}</p>
        <p>Rating: {film.rating}</p>
        <p>Average Rental Cost: {film.average_rental_cost}</p>
      </div>
    </div>
  );
}

export default App;
