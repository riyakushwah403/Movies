
import React, { useEffect, useState } from 'react';
import { API } from '../config';
import { useNavigate } from 'react-router-dom';
import Modal from './Model';
import ModalScreen from './Model';

const List = ({ isMoviePage }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie data
    fetch(`${API}/movies`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        console.log("MM", data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  const handleViewClick = (movie) => {
    console.log(movie);
    navigate(`/movie/${movie._id}`);
  };

  const handleUpdateClick = (movie) => {
    console.log("Update:", movie);
    navigate(`/movie/update/${movie._id}`);
  };

  const handleDeleteClick = (movie) => {
    setShowModal(true)
    setSelectedMovie(movie)
    console.log("setSelectedMovie>>>>>>", selectedMovie)
    // const shouldDelete = window.confirm(`Are you sure you want to delete "${movie.title} "?`);
    // if (shouldDelete) {
    //   fetch(`${API}/movie/delete/${movie._id}`, {
    //     method: 'DELETE',
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log('Deleted movie:', data);

    //       setMovies((prevMovies) => prevMovies.filter((m) => m._id !== movie._id));
    //     })
    //     .catch((error) => {
    //       console.error('Error deleting movie:', error);
    //     });
    // }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    if (selectedMovie) {
      fetch(`${API}/movie/delete/${selectedMovie._id}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Deleted movie:', data);
          setMovies((prevMovies) => prevMovies.filter((m) => m._id !== selectedMovie._id));
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };
  const handleModalClose = () => {
    setShowModal(false)
    setSelectedMovie(null)
  }

  return (
    <div className="movie">
      {/* <h2>Movie List</h2> */}
      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie._id} className="movie-item">
            <h3>{movie.title}</h3>
            <img src={`${API}/movie/photo/${movie._id}`} alt={movie.title} />
            {/* Conditionally render the buttons */}
            {isMoviePage ? (
              <>
                <br />
                <button className='btn' onClick={() => handleUpdateClick(movie)}>Update</button>
                <br />
                <button className='btn' onClick={() => handleDeleteClick(movie)}>Delete</button>
              </>
            ) : (
              <button className='btn' onClick={() => handleViewClick(movie)}>View</button>
            )}
          </li>
        ))}
      </ul>
      {showModal && (
        <ModalScreen
          show={showModal}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          title={selectedMovie ? selectedMovie.title : ''}
        />
      )}
    </div>
  );
};

export default List;

