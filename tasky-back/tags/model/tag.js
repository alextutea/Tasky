const mongoose = require('mongoose');

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 100
    },
    color: {
        type: String,
        validator: [colorValidator, 'Invalid color'],
        required: true,
    }
});

module.exports = mongoose.model('Tag', tagSchema);