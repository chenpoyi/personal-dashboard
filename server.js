const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
// const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI || 'mongodb://localhost/dashboard-database',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected.')
})

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use(morgan('tiny'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}


app.get('', (req,res) => {
  const data = {
    username: 'paulchen',
    age: 25,
  };
  res.json(data);
})


app.listen(PORT, console.log(`Server is starting at ${PORT}`));
