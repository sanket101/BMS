import { axiosInstance } from ".";

export const getAllMovies = async () => {
    try {
        const data = await axiosInstance.get("/api/movies/get-all-movies");
        return data;
    }
    catch(err) {
        console.log("ERR in get all movies", err);
    }
};

export const addMovie = async (movieDetails) => {
    try {
        const data = await axiosInstance.post("/api/movies/add-movie", movieDetails);
        return data;
    }
    catch(err) {
        console.log("ERR in add movies", err);
    }
};

export const updateMovie = async (movieId, movieDetails) => {
    try {
        const data = await axiosInstance.put(`/api/movies/update-movie/${movieId}`, movieDetails);
        return data;
    }
    catch(err) {
        console.log("ERR in update movies", err);
    }
};

export const deleteMovie = async (movieId) => {
    try {
        const data = await axiosInstance.delete(`/api/movies/delete-movie/${movieId}`);
        return data;
    }
    catch(err) {
        console.log("ERR in delete movie", err);
    }
};