import express from 'express';
import productController from '../controllers/product.controller';

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.save);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;