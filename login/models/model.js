const mongoose = require('mongoose');

var registerModel = new mongoose.Schema({
    userName: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    
});
module.exports = mongoose.model('registers', registerModel);