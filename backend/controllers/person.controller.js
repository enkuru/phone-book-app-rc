import Person from '../models/person.model';

exports.getById = (req, res) => {
  Person.findById(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.getAll = (req, res) => {
  Person.find().then(persons => res.send(persons)).catch(err => res.status(500).send(err));
};

exports.save = (req, res) => {
  console.log(req.body);
  const person = new Person(req.body);
  console.log(person);
  person.save().then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};