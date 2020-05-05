const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 200
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    level: {
        type: String,
        required: true,
        min:1,
        max:1
    }
});

module.exports = mongoose.model('User', userSchema);