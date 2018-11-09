import Person from '../models/person.model';

exports.getById = (req, res) => {
  Person.findById(req.params.id).populate('numbers').then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.getAll = (req, res) => {
  Person.find().populate('numbers').then(persons => res.send(persons)).catch(err => res.status(500).send(err));
};

exports.save = (req, res) => {
  const person = new Person(req.body);
  person.save().then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};