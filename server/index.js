const express = require("express");
var cors = require('cors')
require('dotenv').config();

const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Global Variables
const USER_ROUTER = require("./routes/userRouter");

const MOVIE_ROUTER = require("./routes/movieRouter");

// Routes.

app.use("/api/users", USER_ROUTER);

app.use("/api/movies", MOVIE_ROUTER);

app.use((req, res) =>
    res.status(404).json({ message: "page not found" })
);

const port = 5000;
const host = "localhost";
app.listen(port, () => {
    console.log(`server is running on http://${host}:${port}`);
});