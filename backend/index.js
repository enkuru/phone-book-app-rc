import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import products from '././routes/product.route';
import todos from '././routes/todo.route';

// Set up the express app
const app = express();
const PORT = 5000;
const todosPathRoot = '/api/todos';
const productsPathRoot = '/api/products';
const dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
dotenv.config();

app.use(`${productsPathRoot}`, products);
app.use(`${todosPathRoot}`, todos);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});