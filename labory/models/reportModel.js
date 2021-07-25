const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    tests: [{
        name: String,
        entries: [{
            name: String,
            range: String
        }],
        values: [String]
    }],
    uuid: String,
    patient: String
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;