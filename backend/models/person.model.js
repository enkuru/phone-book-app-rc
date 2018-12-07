import mongoose from 'mongoose';
import validator from 'validator';

import PhoneNumber from './phone-number.model';
import timestampPlugin from './plugins/timestamp.plugin';

const PersonSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String, required: true,
    unique: true, lowercase: true
  },
  numbers: [{type: mongoose.Schema.Types.ObjectId, ref: 'PhoneNumber'}]
}, {collection: 'Person'});

PersonSchema.plugin(timestampPlugin);

PersonSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

PersonSchema.virtual('fullName').set(function (name) {
  const str = name.split(' ');

  this.firstName = str[0];
  this.lastName = str[1];
});

PersonSchema.methods.getInitials = function () {
  return this.firstName[0] + this.lastName[0];
};

PersonSchema.statics.getPersons = function () {
  return this.find().then(emails => emails).catch(err => res.status(500).send(err));
};

PersonSchema.pre('remove', function (next) {
  PhoneNumber.remove({owner: this._id}).exec();
  next();
});

export default mongoose.model('Person', PersonSchema);