const mongoose = require("mongoose");
const crypto = require("crypto");
const ramlal = require("uuidv1");
const { timeStamp } = require("console");
// const { futimes } = require("fs");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32

    },
    Lastname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 28
    },

    hashed_password: {
        type: String,
        required: true
    },
   
    salt: String,
    phoneno: {
        type: Number,
        trim: true

    },
   
}, { timestamps: true }
);

//virtual 

userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = ramlal()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })
userSchema.methods = {

    authenticate: function (plaintext) {
        return this.encryptPassword(plaintext) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return " ";
        }
    }
};

module.exports = mongoose.model("User", userSchema);