import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../All/Layout';
import List from './List';

const Movies = () => {
  const navigate = useNavigate();

  const handleCreateMovieClick = () => {
    navigate('/movie/create');
  };

  return (
    <Layout>
   
      <button className='btn' onClick={handleCreateMovieClick}>Create Movie</button>
      <List isMoviePage={true} />
    </Layout>
  );
};

export default Movies;
