const mongoose = require('mongoose');
let validator = require('validator');

const PhoneNumberSchema = new mongoose.Schema({
  number: {
    type: Number, required: true, unique: true,
    validate: value => validator.isNumeric(value)
  }
}, {collection: 'PhoneNumber'});

exports.PhoneNumberSchema = PhoneNumberSchema;
export default mongoose.model('PhoneNumber', PhoneNumberSchema);