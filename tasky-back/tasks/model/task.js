const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    description: {
        type: String,
        default: "A new Tasky task!",
        min: 1,
        max: 2000
    },
    assingnedUsers: {
        type: [String],
        default: [],
    },
    deadline: {
        type: Date,
        default: undefined
    },
    tags: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Task', taskSchema);