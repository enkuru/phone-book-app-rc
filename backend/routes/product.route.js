import express from 'express';

import productController from '../controllers/product.controller';

const router = express.Router();
router.get('/test', productController.test);

module.exports = router;