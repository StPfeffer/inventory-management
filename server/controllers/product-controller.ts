import {
    Request,
    Response
} from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "server/models/product-model";

export const getProducts = (req: Request, res: Response) => {
    const customers = getAllProducts();
    res.json(customers);
};

export const getProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const product = getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
};

export const createProduct = (req: Request, res: Response) => {
    const { name, description, price, quantity, image, supplierId } = req.body;
    const newProduct = addProduct({ name, description, price, quantity, image, supplierId });
    res.status(201).json(newProduct);
};

export const editProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, description, price, quantity, image, supplierId } = req.body;
    updateProduct(id, { name, description, price, quantity, image, supplierId });
    res.status(204).send();
};

export const removeProduct = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteProduct(id);
    res.status(204).send();
};
