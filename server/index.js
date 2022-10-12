const express = require('express');
const cors = require('cors');
//leads us to our routes
const authRoutes = require("./routes/auth.js");
//creating an instance of express app
const app = express();
//specify the port of our backend
const PORT = process.env.PORT || 5500;
//call the environment variables right into our node application because we are going to use a lot of environment variables
require('dotenv').config();


app.use(cors()); //make cross-origin requests 
app.use(express.json());//to parse json payloads from the frontend to the backend
app.use(express.urlencoded());//built-in middleware function in express, it parses incoming requests with urlencoded payloads based on body-parser

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));