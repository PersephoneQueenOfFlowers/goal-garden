const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const journals = require("./routes/api/journals")
// const goals = require("./routes/api/goals");
const bodyParser = require('body-parser');
const User = require('./models/User');
const passport = require('passport');

const Goal = require('./models/Goal');
const goals = require("./routes/api/goals");

const path = require('path');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

 

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// app.get("/", (req, res) => {
//   res.send("Welcome to Goal Garden")
// });


app.use("/api/users", users);
app.use("/api/journals", journals);
app.use("/api/goals", goals);
// app.use(express.static('frontend/public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'frontend', 'public', 'index.html'));
// })


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));