const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Recipes = new Schema({

    title: {
        trim: true,
        index: true,
        type: String,
        required: true,
        lowercase: true,
    },
    image: {
        type: String,
    },
    preparationTime: {
        type: Number,
        required: true,
    },
    numberPeople: {
        type: Number,
        required: true,
    },
    zoubida: {
        type: Number,
    },
    step: [{
        type: String,
        required: true,
    }],
    ingredients: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        gramming: {
            type: String,
            required: false,
        },
    }]
}, { timestamps: true })


module.exports = mongoose.model('Recipes', Recipes);