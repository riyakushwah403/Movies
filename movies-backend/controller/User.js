const User = require ("../model/User")
const jwt = require('jsonwebtoken');//generate signin token
const {expressjwt} = require('express-jwt');//authoration check
//  const errorHandler = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        
        savedUser.salt = undefined;
        savedUser.hashed_password = undefined;
     
        res.json({ user: savedUser });
    } catch (err) {
      
        return res.status(400).json({ err });
    }
};

exports.signin = async (req, res) => {
    // find user based on email
    console.log('body>>>>>>>>', req.body);
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          error: "User with that email does not exist",
        });
      }
  
      // authenticate user
      const isAuthenticated = await user.authenticate(password);
      if (!isAuthenticated) {
        return res.status(401).json({
          error: "Email and password don't match",
        });
      }
  
    
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
      res.cookie("t", token, { expire: new Date() + 9999999 });
  

      const { _id, name, email: userEmail, Lastname,phoneno} = user; 
      return res.json({ token, user: { _id, name,Lastname, email: userEmail, phoneno } });
    } catch (err) {
      console.error("Error during signin:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
  



exports.signout = (req, res) => {
     res.clearCookie('t')
     res.json({message:'signout succesfully'})
}








                                            