const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    salt: String,
    password: String,
});

const user = mongoose.model('User', userSchema);
module.exports = user;