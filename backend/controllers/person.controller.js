import Person from '../models/person.model';
import PhoneNumber from '../models/phone-number.model';

exports.getById = (req, res) => {
  Person.findById(req.params.id).populate('numbers').then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.getAll = (req, res) => {
  Person.find().populate('numbers').then(persons => res.send(persons)).catch(err => res.status(500).send(err));
};

exports.save = (req, res) => {
  const data = {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email};
  const person = new Person(data);

  person.save().then(async person => {
    let numbers = req.body.numbers.map(n => ({number: n.number, owner: person._id}));

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const start = async () => {
      await asyncForEach(numbers, async (num) => await new PhoneNumber(num).save());
      Person.findById(person._id).populate('numbers').then(person => res.send(person));
    };

    await start();
  }).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(person => res.send(person)).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};