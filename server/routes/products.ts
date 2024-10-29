import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    removeProduct,
} from '../controllers/product-controller';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', editProduct);
router.delete('/:id', removeProduct);

export default router;
