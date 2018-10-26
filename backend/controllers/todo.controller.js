import db from "../db/db";

const validateTodo = (title, description) => {
  const error = {};
  title || (error.title = 'title is required');
  description || (error.title = 'description is required');

  return error;
};

exports.getAll = (req, res) => {
  res.status(200).send(db)
};

//get one todo
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = db.filter(todo => todo.id === id)[0];

  return todo ? res.status(200).send(todo) : res.status(404).send({message: 'todo does not exist'});
};

//create todo
exports.save = (req, res) => {
  const error = validateTodo(req.body.title, req.body.description);

  if (Object.keys(error).length) {
    return res.status(400).send({success: 'false', error});
  } else {
    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description
    };

    db.push(todo);
    return res.status(201).send(todo)
  }
};

//update todo
exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todo = db.filter(todo => todo.id === id)[0];

  if (!todo) {
    return res.status(404).send({message: 'todo not found'});
  }

  const error = validateTodo(req.body.title, req.body.description);

  if (Object.keys(error).length) {
    return res.status(400).send({success: 'false', error});
  }

  todo.title = req.body.title;
  todo.description = req.body.description;

  return res.status(201).send(todo);
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);
      return res.status(200).send({success: 'true'});
    }
  });

  return res.status(404).send({success: 'false'});
};