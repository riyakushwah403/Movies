import React, { useEffect, useState } from 'react';
import { API } from '../config';
import Layout from '../All/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const MovieDelete= () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Fetch movie data by ID
    fetch(`${API}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [movieId]);

  const handleDelete = () => {
    // Send the delete request to the server
    fetch(`${API}/movie/delete/${movieId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Deleted movie:', data);
        // Optionally, you can navigate to the movies page after successful deletion
        navigate('/movies');
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  };

  return (
    <Layout title='Delete movie'
    description='delete selected movie'>
        <div className="movie-delete">
      {movie ? (
        <>
          <h2>Delete Movie</h2>
          <p>Title: {movie.title}</p>
          <img src={`${API}/movie/photo/${movie._id}`} alt={movie.title} />
          <p>Release Date: {movie.releaseDate}</p>
          <p>Description: {movie.description}</p>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </Layout>
  );
};

export default MovieDelete;
