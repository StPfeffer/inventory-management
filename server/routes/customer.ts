import express from 'express';
import {
    getCustomers,
    getCustomer,
    createCustomer,
    editCustomer,
    removeCustomer,
} from '../controllers/customer-controller';

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomer);
router.post('/', createCustomer);
router.put('/:id', editCustomer);
router.delete('/:id', removeCustomer);

export default router;
