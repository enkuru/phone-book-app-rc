import Product from '../models/product.model';

exports.getById = (req, res) => {
  Product.findById(req.params.id).then(product => res.send(product)).catch(err => res.status(500).send(err));
};

exports.getAll = (req, res) => {
  Product.find().then(products => res.send(products)).catch(err => res.status(500).send(err));
};

exports.save = (req, res) => {
  const product = new Product({name: req.body.name, price: req.body.price});
  product.save().then(product => res.send(product)).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then(product => res.send(product)).catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.id).then(product => res.send(product)).catch(err => res.status(500).send(err));
};