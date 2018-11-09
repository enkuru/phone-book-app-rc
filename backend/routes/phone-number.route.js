import express from 'express';
import phoneNumberController from '../controllers/phone-number.controller';

const router = express.Router();

router.get('/person/:personId', phoneNumberController.getByPersonId);
router.get('/:id', phoneNumberController.getById);
router.post('/', phoneNumberController.save);
router.put('/:id', phoneNumberController.update);
router.delete('/:id', phoneNumberController.delete);

module.exports = router;