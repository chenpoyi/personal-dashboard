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

//Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String
})

//Model
const User = mongoose.model('User', UserSchema);

//Save data to mongo database
const data ={
  name: 'Paul',
  email: 'paulchen647@gmail.com'
}

const newUser = new User(data);
// newUser.save((err) => {
//   if(err){
//     console.log('There is an error.')
//   } else {
//     console.log('User has been saved!');
//   }
// })

//HTTP request logger
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

app.get('/api', (req, res) => {
  User.find({ })
  .then((data) => {
    console.log('Data: ', data);
    res.json(data)
  })
  .catch((error) => {
    console.log('Error: ', error);
  })
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
