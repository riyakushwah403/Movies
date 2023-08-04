const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 320

    },
    releaseDate: {
        type: Date,
        required: true,
        trim: true

    },

    photo: {
        data: Buffer,
        contentType: String
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("movie", movieSchema);