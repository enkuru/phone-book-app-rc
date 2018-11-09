import express from 'express';
import * as personController from '../controllers/person.controller';

const router = express.Router();

router.get('/', personController.getAll);
router.get('/:id', personController.getById);
router.post('/', personController.save);
router.put('/:id', personController.update);
router.delete('/:id', personController.delete);

module.exports = router;