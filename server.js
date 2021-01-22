const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI || 'mongodb://localhost/dashboard-database',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected.')
})
//HTTP request logger
app.use(morgan('tiny'));

app.get('', (req,res) => {
  const data = {
    username: 'paulchen',
    age: 25,
  };
  res.json(data);
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
