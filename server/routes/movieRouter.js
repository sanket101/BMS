const express = require("express");
const checkAuth = require("../middleware/auth");
const { addMovie, getAllMovies, getMovie, deleteMovie, updateMovie } = require("../controller/movieController");
const { validateSchemaFields } = require("../middleware/validation");
const { movieValidationSchema, updateMovieSchema } = require("../validationSchema/movieValidation");

const movieRouter = express.Router();

movieRouter.post("/add-movie", checkAuth, validateSchemaFields(movieValidationSchema), addMovie);

movieRouter.get("/get-all-movies", checkAuth, getAllMovies);

movieRouter.get("/get-movie/:id", checkAuth, getMovie);

movieRouter.put("/update-movie/:id", checkAuth, validateSchemaFields(updateMovieSchema), updateMovie);

movieRouter.delete("/delete-movie/:id", checkAuth, deleteMovie);

module.exports = movieRouter;