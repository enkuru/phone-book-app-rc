import Person from '../models/person.model';
import PhoneNumber from '../models/phone-number.model';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

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

    const start = async () => {
      await asyncForEach(numbers, async (num) => await new PhoneNumber(num).save());
      Person.findById(person._id).populate('numbers').then(person => res.send(person));
    };

    await start();
  }).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  let numbers = req.body.numbers.map(n => (n._id ? n : {number: n.number, owner: person._id}));
  req.body.numbers = req.body.numbers.filter(n => !!n._id);

  Person.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate('numbers').then(async person => {
    const start = async () => {
      await PhoneNumber.find({owner: req.params.id}).then(async numbers => {
        let willDeletes = numbers.filter(num => !req.body.numbers.find(n => num._id.toJSON() === n._id));

        await asyncForEach(willDeletes, async (num) => await PhoneNumber.findByIdAndRemove(num._id));
      });

      await asyncForEach(numbers, async (num) => num._id ? PhoneNumber.findByIdAndUpdate(num._id, {$set: num}) : await new PhoneNumber(num).save());

      Person.findById(person._id).populate('numbers').then(person => res.send(person));
    };

    await start();
  }).catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
};

exports.delete = (req, res) => {
  Person.findByIdAndRemove(req.params.id).then(person => res.send(person)).catch(err => res.status(500).send(err));
};