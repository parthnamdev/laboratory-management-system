const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    test: String,
    entries: [{
        name: String,
        range: String
    }]
});

const Test = mongoose.model('test', testSchema);

module.exports = Test;
