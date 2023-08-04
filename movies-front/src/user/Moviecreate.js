import React, { useState } from 'react';
import { API } from '../config';
import { useNavigate } from 'react-router-dom';
import Layout from '../All/Layout';


const CreateMovie = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    description: '',
    photo: null, // To store the selected photo file
    // Add more fields if your movie object has more properties
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithPhoto = new FormData();
    formDataWithPhoto.append('title', formData.title);
    formDataWithPhoto.append('releaseDate', formData.releaseDate);
    formDataWithPhoto.append('description', formData.description);
    formDataWithPhoto.append('photo', formData.photo);

    // Send the new movie data with photo to the server for creation
    fetch(`${API}/movie/create`, {
      method: 'POST',
      body: formDataWithPhoto,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Created movie:', data);
        // Optionally, you can reset the form fields after successful creation
        setFormData({
          title: '',
          releaseDate: '',
          description: '',
          photo: null,
        });
        // Navigate to the movies page after successful creation
        navigate('/movies');
      })
      .catch((error) => {
        console.error('Error creating movie:', error);
      });
  };

  return (
   <Layout title='Create Movie'
   description='you Create the new movie'>
     <div className="create-movie-form">
    
      <form onSubmit={handleSubmit} className='form-control'>
      <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handlePhotoChange} required />
        </div>
        <div>
          <label>Title:</label>
          <input
          className='form-item'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
          className='form-item'
            type="text"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
          className='form-item'
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
       
        {/* Add more input fields for other movie properties if needed */}
        <button className='btn' type="submit">Create</button>
      </form>
    </div>
   </Layout>
  );
};

export default CreateMovie;
