const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    breed:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type:String,
    },
    price: {
        type:Number,
        required: true,
    }
})

const animal = mongoose.model('animal', animalSchema)

module.exports = animal;