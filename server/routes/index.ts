import express from 'express';

import productRoutes from './products';
import customerRoutes from './customer';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/customers', customerRoutes);

export default router;
