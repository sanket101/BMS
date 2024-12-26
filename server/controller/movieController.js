const movieModel = require("../model/movieModel");
const sendErrorResponse = require("../util/errorResponse");

const addMovie = async (req, res) => {
    try {
        const movie = new movieModel(req.body);
        await movie.save();
        res.status(201).json({status: "success", message: "Movie saved successfully"});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        // console.log("ALL", movies);
        res.status(200).json({status: "success", message: "Movies fetched successfully", data: movies});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);
        if(!movie) {
            sendErrorResponse(res, 404, { message: "Movie not found" });
            return;
        }
        res.status(200).json({status: "success", message: "Movie fetched successfully", data: movie});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await movieModel.findByIdAndDelete(req.params.id);
        if(!movie) {
            sendErrorResponse(res, 404, { message: "Movie not found" });
            return;
        }
        res.status(200).json({status: "success", message: "Movie deleted successfully"});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

const updateMovie = async (req, res) => {
    try {
        const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body);
        if(!movie) {
            sendErrorResponse(res, 404, { message: "Movie not found" });
            return;
        }
        res.status(200).json({status: "success", message: "Movie updated successfully"});
        return;
    }
    catch(err) {
        sendErrorResponse(res, 500, { message: err.message });
        return;
    }
};

module.exports = { addMovie, getAllMovies, getMovie, deleteMovie, updateMovie };