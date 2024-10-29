import express from 'express';
import {
    getSuppliers,
    getSupplier,
    createSupplier,
    editSupplier,
    removeSupplier,
} from '../controllers/supplier-controller';

const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSupplier);
router.post('/', createSupplier);
router.put('/:id', editSupplier);
router.delete('/:id', removeSupplier);

export default router;
