const { mongoose } = require("mongoose");

const DB_URL = process.env.DB_URL;

const OPTIONS = {
    family: 4 // Use IPv4, skip trying IPv6
};

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, OPTIONS);
        console.log("Connected to MongoDB.");
    } catch (err) {
        console.log("Error: ", err);
    }
}

module.exports = connectDB; 