const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    firstName: String,
    mainCategory: String,
    proTallent: Boolean,
    availableToWork: Boolean,
    lastName: String,
    hourlyRate: Number,
    avatar: String,
    verified: Boolean,
    description: String,
    category: String,
    revenue: Number,
    jobs: {
        completed: Number,
        cancelled: Number,
        inProgress: Number,
    },

    services: [
        {
            title: String,
            description: String,
            comments: [
                {
                    projectHeading: String,
                    description: String,
                    commentDate: Date,
                    rated: Number,
                    price: Number,
                },
            ],
            profile: [String],
        },
    ],
    comments: [
        {
            Heading: String,
            title: String,
            date: Date,
            rated: Number,
        },
    ],
    specialization: [String],
    projectsThumbs: [String],
});

const Developers = mongoose.model('Developers', developerSchema);

module.exports = Developers;