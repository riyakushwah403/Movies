import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./All/Home";
import MovieDetailsPage from "./All/MovieDetailsPage";
import Movies from "./user/Movies"
import PrivateRoute from "./PrivateRoute";
import MovieUpdate from "./user/MovieUpdate";
import MovieDelete from "./user/MovieDelete";
import CreateMovie from "./user/Moviecreate";
import "./All/style.css";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/movies" element= {< Movies/>}/>
        <Route path="/movie/:movieId" element={<MovieDetailsPage/>} />
        <Route path="/movie/update/:movieId" element={<MovieUpdate/>} />
        <Route path="/movie/delete/:movieId"  element= {<MovieDelete />}/>
        <Route path="/movie/create"  element= {<CreateMovie />}/>
        
    
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
