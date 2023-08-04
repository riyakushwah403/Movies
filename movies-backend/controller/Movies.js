const multer = require('multer');
const Movie = require('../model/Movies'); // Make sure to adjust the path to your movie model
const formidable = require("formidable")
const fs = require("fs")


exports.createMovie = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        });
      }
      const { title, description, releaseDate } = fields;
      if (!title || !description || !releaseDate) {
        return res.status(400).json({
          error: "provide all filed",
        });
      }
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          if (key == "title" || key == "description") {
            fields[key] = fields[key].join()
          } else if (key == "releaseDate") {
            fields[key] = Date(fields[key].join())
          } 
        }
      }
      let movie = new Movie(fields);
      if (files.photo) {
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1mb in size",
          });
        }
        const filePath = files.photo.map(item => { return item.filepath });
        const mimetype = files.photo.map(item => { return item.mimetype });
        console.log("filePath", filePath, "mimetype", mimetype);
        movie.photo.data = fs.readFileSync(...filePath); // change path to filepath
        movie.photo.contentType = mimetype.join(); // change typt to mimetype
      }
  
      try {
        const result = await movie.save();
        res.json(result);
      } catch (err) {
        res.status(400).json({
          error: err.message // Use err.message to get the error message from Mongoose
        });
      }
    });
  };
  // Get all movies 
exports.getAllMovies = async (req, res) => {

    try {
      const movies = await Movie.find().select('-photo'); 
      res.json(movies);
    console.log(movies);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch movies" });
    }
  };

  exports.getMovieById = async (req, res) => {
    try {
      const movieId = req.params.movieId; // Get the movie ID from the request parameters
  
      // Find the movie by its ID and exclude the 'photo' field from the query result
      const movie = await Movie.findById(movieId).select('-photo');
  
      if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      res.json(movie);
      req.movie= movie;
      console.log("movie???",req.movie);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch movie" });
    }
  };
  
 

  exports.updateMovie = async (req, res) => {
    try {
      const movieId = req.params.movieId;
      const updateFields = req.body;
      console.log( "req>>>>>>",req.body);
      // console.log("movieId>>>>>>>>>",req.param.movieId)
  
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, updateFields, {
        new: true, // Return the modified document after the update
      });
  
      if (!updatedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      res.json(updatedMovie);
    } catch (err) {
      res.status(400).json({ error: "Failed to update movie" });
    }
  };
  

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId; 


    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete movie" });
  }
};





exports.photo = async (req, res, next) => {
  try {
    const movieId = req.params.movieId;

  
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send('Movie not found');
    }

   
    if (!movie.photo || !movie.photo.data) {
      return res.status(404).send('Movie photo not found');
    }

    
    res.set('Content-Type', movie.photo.contentType);

    
    res.send(movie.photo.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



  
  
  
  
  




