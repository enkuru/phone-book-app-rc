import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import products from './routes/product.route';
import todos from './routes/todo.route';
import persons from './routes/person.route';
import phoneNumbers from './routes/phone-number.route';

const todosPathRoot = '/api/todos';
const productsPathRoot = '/api/products';
const personsPathRoot = '/api/persons';
const phoneNumbersPathRoot = '/api/phoneNumbers';

import Person from './models/person.model';
import PhoneNumber from './models/phone-number.model'

const PORT = 5000;
const dbUrl = 'mongodb://localhost/phone-book-app-rc';

mongoose.connect(dbUrl, {useNewUrlParser: true})
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error: ', err)
  });

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
dotenv.config();

app.use(`${productsPathRoot}`, products);
app.use(`${todosPathRoot}`, todos);
app.use(`${personsPathRoot}`, persons);
app.use(`${phoneNumbersPathRoot}`, phoneNumbers);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);

  console.log('starting foo test of collection relationships...');

  /*PhoneNumber.findOne().then(p => {
    console.log("find one number, ", p);
    p.remove().then(r => {
      console.log("remove number, ", r);
    })
  });*/

  /*let randomVal = Math.floor(Math.random() * 100);
  let person = new Person({
    firstName: "enes",
    lastName: "kuru",
    email: "e.kk@a" + randomVal + ".com"
  });

  person.save().then(p => {
    console.log("person saved, ", p);
    let number = new PhoneNumber({number: "1234500" + randomVal, owner: person._id});

    number.save().then(n => {
      console.log("number saved, ", n);
      Person.findById(person._id).populate('numbers').then(p => console.log('last state of person, ', p));
    });
  });*/
});