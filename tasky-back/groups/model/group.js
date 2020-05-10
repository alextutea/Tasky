const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    description: {
        type: String,
        default: "A brand new Tasky group!",
        min: 0,
        max: 2000
    },
    admins: {
        type: [String],
        required: true
    },
    users: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: [] //TODO: Add default tag ids
    },
    tasks: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Group', groupSchema);