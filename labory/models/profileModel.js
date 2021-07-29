const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    address: String,
    number: String,
    email: String,
    logo: String,
    mimetype: String
})
const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;