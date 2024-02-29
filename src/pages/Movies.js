import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Movies() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [cust_rent, set_cust_rent] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Clear previous error message
    setError('');
  
    // Check if the customer ID is greater than 700
    if (parseInt(cust_rent) > 700) {
      setError('Error: Customer ID Not Found');
      return;
    }
  
    try {
      const response = await axios.get(`/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Error searching movies. Please try again later.');
    } finally {
      // Clear search query if there's no error
      if (!error) {
        setQuery('');
        set_cust_rent(''); // Clear customer ID search
      }
    }
  };
  
  
  // Function to handle click on movie title and show popup
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleClosePopup();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress);
    };
  }, []); 

  return (
    <div>
      {error && (
        <div className="popup-error">
          <span className="close-popup" onClick={() => setError('')}>&times;</span>
          {error}
        </div>
      )}
      <br />
      <section>
        <input
          type="movie_search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder="Search movies by title, actor, or genre..."
        />
      </section>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actors</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.film_id}>
              <td onClick={() => handleMovieClick(result)}>{result.title}</td>
              <td>Actors: {result.actors.map(actor => `${actor.first_name} ${actor.last_name}`).join(', ')}</td>
              <td>Genres: {result.categories.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup to display movie details */}
      {selectedMovie && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h2>{selectedMovie.title}</h2>
            <p>Description: {selectedMovie.description}</p>
            <p>Release Year: {selectedMovie.release_year}</p>
            <p>Rental Rate: ${selectedMovie.rental_rate.toFixed(2)}</p>
            <p>Length: {selectedMovie.length} minutes</p>
            <p>Actors: {selectedMovie.actors.map(actor => `${actor.first_name} ${actor.last_name}`).join(', ')}</p>
            <p>Genres: {selectedMovie.categories.join(', ')}</p>
            <section>
              <input
                type="customer_search"
                value={cust_rent}
                onChange={(e) => set_cust_rent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="Customer ID"
              />
              <button onClick={handleSearch}>Search</button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movies;
