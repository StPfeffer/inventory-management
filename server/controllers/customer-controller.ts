import {
    Request,
    Response
} from 'express';
import {
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from 'server/models/customer-model';

export const getCustomers = (req: Request, res: Response) => {
    const customers = getAllCustomers();
    res.json(customers);
};

export const getCustomer = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const customer = getCustomerById(id);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).json({ error: 'Customer not found' });
    }
};

export const createCustomer = (req: Request, res: Response) => {
    const { name, document, contact, address } = req.body;
    const newCustomer = addCustomer({ name, document, contact, address });
    res.status(201).json(newCustomer);
};

export const editCustomer = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, document, contact, address } = req.body;
    updateCustomer(id, { name, document, contact, address });
    res.status(204).send();
};

export const removeCustomer = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteCustomer(id);
    res.status(204).send();
};
