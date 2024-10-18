import {
    Request,
    Response
} from 'express';
import db from '../db';

export const getProducts = (req: Request, res: Response) => {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();

    res.json(products);
};

export const addProduct = (req: Request, res: Response) => {
    const { name } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?)');
    const info = stmt.run(name);

    res.json({ id: info.lastInsertRowid });
};
