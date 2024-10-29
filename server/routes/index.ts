import express from 'express';

import productRoutes from './products';
import customerRoutes from './customer';
import supplierRoutes from './supplier';

const router = express.Router();

router.use('/products', productRoutes);
router.use('/customers', customerRoutes);
router.use('/suppliers', supplierRoutes);

export default router;
