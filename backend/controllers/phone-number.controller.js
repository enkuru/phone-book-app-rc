import PhoneNumber from '../models/phone-number.model';

exports.getById = (req, res) => {
  PhoneNumber.findById(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.getAllByPersonId = (req, res) => {
  PhoneNumber.find({owner: req.body.id}).then(persons => res.send(persons)).catch(err => res.status(500).send(err));
};

exports.save = (req, res) => {
  const person = new PhoneNumber(req.body);
  person.save().then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  PhoneNumber.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  PhoneNumber.findByIdAndRemove(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};