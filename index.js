const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();
//importe routes

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
// Middleware

app.use(express.json());


// Router Middleware

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);


// connection to database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        console.log("Database Connected!")
    )
    .catch((err) =>
        console.log(err)
    );

// app GET request
app.get('/', (req, res) => {
    res.send('Connection Successful');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
