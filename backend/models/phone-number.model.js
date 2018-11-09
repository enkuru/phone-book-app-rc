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

PhoneNumberSchema.post('save', function (doc, next) {
  console.log('post save of PhoneNumberSchema, ', doc);
  Person.updateOne({_id: doc.owner}, {$push: {numbers: doc._id}}).exec(() => next());
});

PhoneNumberSchema.post('remove', function (doc, next) {
  console.log('post remove of PhoneNumberSchema, ', doc);
  Person.updateOne({_id: doc.owner}, {$pull: {numbers: doc._id}}).exec(() => next());
});

export default mongoose.model('PhoneNumber', PhoneNumberSchema);