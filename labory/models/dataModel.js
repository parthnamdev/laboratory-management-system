const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    patient: {
         name: String,
         age: String,
         gender: String,
         date: String,
         number: String,
         email: String,
         address: String
    },
    tests: [String]
});

const Data = mongoose.model('data', dataSchema);

module.exports = Data;