import {
    Request,
    Response
} from 'express';
import {
    addSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier
} from "server/models/supplier-model";

export const getSuppliers = (req: Request, res: Response) => {
    const suppliers = getAllSuppliers();
    res.json(suppliers);
};

export const getSupplier = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const supplier = getSupplierById(id);
    if (supplier) {
        res.json(supplier);
    } else {
        res.status(404).json({ error: 'Supplier not found' });
    }
};

export const createSupplier = (req: Request, res: Response) => {
    const { name, document, contact, address } = req.body;
    const newSupplier = addSupplier({ name, document, contact, address });
    res.status(201).json(newSupplier);
};

export const editSupplier = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, document, contact, address } = req.body;
    updateSupplier(id, { name, document, contact, address });
    res.status(204).send();
};

export const removeSupplier = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteSupplier(id);
    res.status(204).send();
};
