const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser')
const cors = require('cors')


const app = express(); 
require('dotenv').config();

const userRoutes = require('./routes/User')
const movieRoutes = require ('./routes/Movies')

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api' ,userRoutes);
app.use('/api',movieRoutes);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Db connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
