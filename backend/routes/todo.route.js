import express from 'express';

import * as todoController from '../controllers/todo.controller';

const router = express.Router();

router.get('', todoController.getAll);

router.get('/:id', todoController.getOne);

router.post('', todoController.save);

router.put('', todoController.update);

router.delete('/:id', todoController.delete);

module.exports = router;