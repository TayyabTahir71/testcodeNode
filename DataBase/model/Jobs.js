const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    applications: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        required: true,
    },
    portfolio: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mainCategory: {
        type: String,
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
});

const JobsSkelton = mongoose.model('Jobs', jobSchema);

module.exports = JobsSkelton;