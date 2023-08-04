
import React from 'react';
import Layout from '../All/Layout';
import List from '../user/List';

const Home = () => {
  return (
    <Layout title=' Home Page'
    description='We can view movies'>
      {/* Pass isMoviePage prop as false for the home page */}
      <List isMoviePage={false} />
    </Layout>
  );
};

export default Home;

