import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from 'morgan';
import listOfEndpoints from 'express-list-endpoints';

import products from './routes/product.route';
import todos from './routes/todo.route';
import persons from './routes/person.route';
import phoneNumbers from './routes/phone-number.route';

const apiRoot = '/api';
const infoPathRoot = `${apiRoot}/info`;
const todosPathRoot = `${apiRoot}/todos`;
const productsPathRoot = `${apiRoot}/products`;
const personsPathRoot = `${apiRoot}/persons`;
const phoneNumbersPathRoot = `${apiRoot}/phoneNumbers`;

const PORT = 5000;
const app = express();
const dbUrl = 'mongodb://localhost/phone-book-app-rc';

mongoose.connect(dbUrl, {useNewUrlParser: true})
  .then(() => console.log('Database connection successful'))
  .catch(err => console.error('Database connection error: ', err));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(logger('dev'));
dotenv.config();

app.use(`${infoPathRoot}`, (req, res) => res.send(listOfEndpoints(app)));
app.use(`${productsPathRoot}`, products);
app.use(`${todosPathRoot}`, todos);
app.use(`${personsPathRoot}`, persons);
app.use(`${phoneNumbersPathRoot}`, phoneNumbers);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
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
  });

  PhoneNumber.findOne().then(p => {
    console.log("find one number, ", p);
    p.remove().then(r => {
      console.log("remove number, ", r);
    })
  });*/
});