const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: false,
        default: false
    },
    completedOn: {
        type: Date,
        required: false
    }
}, {timestamps: true});

const Task = mongoose.model('Task', schema);
module.exports = Task;