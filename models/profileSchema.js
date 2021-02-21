const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    starCoins: { type: Number, default: 1000 },
    bank: { type: Number }
})

const model = mongoose.model('Profile Models', profileSchema);

module.exports = model;