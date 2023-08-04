// import React, { useEffect, useState } from 'react';
// import { API } from '../config';
// import { useNavigate, useParams } from 'react-router-dom';
// import Layout from '../All/Layout';

// const MovieUpdate = () => {
//   const { movieId } = useParams();
//   const [formData, setFormData] = useState({
//     title: '',
//     releaseDate: '',
//     description: '',
   
    
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch movie data by ID
//     fetch(`${API}/movie/${movieId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFormData({
//           title: data.title,
//           releaseDate: data.releaseDate,
//           description: data.description,
          
//         });
//       })
//       .catch((error) => {
//         console.error('Error fetching movie data:', error);
//       });
//   }, [movieId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send the updated movie data to the server
//     fetch(`${API}/movie/update/${movieId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Updated movie data:', data);
//         // Optionally, you can navigate to the movie details page after successful update
//      navigate(`/movies`);
//       })
//       .catch((error) => {
//         console.error('Error updating movie data:', error);
//       });
//   };

//   return (
//   <Layout title='Update movie'
//   description='you can update movie title,description and realse date'>
//       <div className="movie-update">
     
//       <form onSubmit={handleSubmit} className='form-control'>
//         <div>
//           <label>Title:</label>
//           <input
//           className='form-item'
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Release Date:</label>
//           <input
//            className='form-item'
//             type="text"
//             name="releaseDate"
//             value={formData.releaseDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//            className='form-item'
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//           />
//         </div>

      
//         <button className='btn' type="submit">Update</button>
//       </form>
//     </div>
//   </Layout>

//   );
// };

// export default MovieUpdate;

import React, { useEffect, useState } from 'react';
import { API } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../All/Layout';

const MovieUpdate = () => {
  const { movieId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    description: '',
    photo: null, // This will store the selected image file
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movie data by ID
    fetch(`${API}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          title: data.title,
          releaseDate: data.releaseDate,
          description: data.description,
        });
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [movieId]);

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
    // Send the updated movie data to the server
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('releaseDate', formData.releaseDate);
    updatedData.append('description', formData.description);
    if (formData.photo) {
      updatedData.append('photo', formData.photo);
    }

    fetch(`${API}/movie/update/${movieId}`, {
      method: 'PUT',
      body: updatedData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated movie data:', data);
        // Fetch the updated movie data again
        fetch(`${API}/movie/${movieId}`)
          .then((response) => response.json())
          .then((data) => {
            setFormData({
              title: data.title,
              releaseDate: data.releaseDate,
              description: data.description,
              photo: null, // Reset the photo field after successful update
            });
          })
          .catch((error) => {
            console.error('Error fetching updated movie data:', error);
          });
        navigate('/movies'); // Navigate to the movies page after successful update
      })
      .catch((error) => {
        console.error('Error updating movie data:', error);
      });
  };

  return (
    <Layout title="Update movie" description="you can update movie title, description, release date, and photo">
      <div className="movie-update">
        <form onSubmit={handleSubmit} className="form-control">
          <div>
            <label>Title:</label>
            <input
              className="form-item"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Release Date:</label>
            <input
              className="form-item"
              type="text"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              className="form-item"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Photo:</label>
            <input
              className="form-item"
              type="file"
              name="photo"
              onChange={handlePhotoChange}
            />
          </div>

          <button className="btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default MovieUpdate;


  

 

 

