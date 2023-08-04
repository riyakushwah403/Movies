

const express = require('express');
const router = express.Router();
const { createMovie, getAllMovies, updateMovie, deleteMovie, getMovieById,photo } = require('../controller/Movies');





 
router.post('/movie/create',  createMovie);

router.get('/movies', getAllMovies);
router.get('/movie/:movieId', getMovieById); 
router.put('/movie/update/:movieId', updateMovie); 
router.delete('/movie/delete/:movieId', deleteMovie); 
router.get('/movie/photo/:movieId',photo)

module.exports = router;
