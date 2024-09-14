const mongoose = require('mongoose');

const  plantSchema = new mongoose.Schema({
    name: {type: String, reuired:true},
    description: {type: String, required: true},
    image: String,
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports= Plant