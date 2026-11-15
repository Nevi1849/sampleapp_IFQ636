
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
    founder: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    title: { 
        type: String,
        required: false
    },
    category: { 
        type: String,
        required: false
    },
    problem: { 
        type: String,
        required: false
    },
    solution: { 
        type: String,
        required: false
    },
    targetMarket: { 
        type: String,
        required: false
    },
    fundingTarget: { 
        type: Number,
        required: false,
        min: 0,
    },
    innovationScore: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    feasibilityScore: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    marketPotentialScore: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    reviewerFeedback: {
        type: String,
        default: ''
    },
    status: { 
        type: String,
        enum: ['Draft', 'Submitted', 'Under Review', 'Approved', 'Revision Needed', 'Rejected'],
        default: 'Draft'
    },

}, { timestamps:true});

module.exports = mongoose.model('Idea', ideaSchema);