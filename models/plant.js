const mongoose = require('mongoose');

const  plantSchema = new mongoose.Schema({
    name: String, 
    description: String,
    type: String,
    indoor: Boolean,
    
});

const Plant = mongoose.model('Plant', plantSchema);
module.exports= Plant