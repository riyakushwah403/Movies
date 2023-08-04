
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config";
import Layout from "./Layout";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie data by ID
    fetch(`${API}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        console.error("Error response:", error.response); 
      });
  }, [movieId]);

  const handleCloseButtonClick = () => {
    navigate("/"); 
  };

  return (
    <Layout title="Movies Details" description="View movie details">
      <div className="movie-details">
        {movie ? (
          <>
            <h2>{movie.title}</h2>
            <img src={`${API}/movie/photo/${movie._id}`} alt={movie.title} />
            <p>Release Date: {movie.releaseDate}</p>
            <p>Description: {movie.description}</p>
            <button className="btn" onClick={handleCloseButtonClick}>Close</button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
};

export default MovieDetailsPage;

