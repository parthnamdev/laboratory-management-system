const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    tests: [{
        name: String,
        entries: [{
            name: String,
            range: String
        }],
        price: Number,
        values: [String]
    }],
    uuid: String,
    patient: String,
    remark: String,
    
});

const Report = mongoose.model('report', reportSchema);

module.exports = Report;