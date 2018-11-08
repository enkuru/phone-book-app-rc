import mongoose from 'mongoose';
import validator from 'validator';

import Person from './person.model';

const PhoneNumberSchema = new mongoose.Schema({
  number: {
    type: String, required: true, unique: true,
    validate: value => validator.isNumeric(value)
  },
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Person'}
}, {collection: 'PhoneNumber'});

PhoneNumberSchema.post('save', function (doc) {
  console.log('post save of PhoneNumberSchema, ', doc);
  Person.findById(doc.owner).then(person => {
    person.numbers.push(doc._id);
    person.update();
  });
});

PhoneNumberSchema.post('remove', function (doc) {
  console.log('remove save of PhoneNumberSchema, ', doc);
  Person.findById(doc.owner).then(person => {
    person.numbers.remove(doc._id);
    person.update();
  });
});

export default mongoose.model('PhoneNumber', PhoneNumberSchema);