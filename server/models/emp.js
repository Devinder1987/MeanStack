const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empSchema = new Schema({
    name: String,
    empCode: String,
    description: String
});

module.exports = mongoose.model('employee', empSchema, 'employee');
