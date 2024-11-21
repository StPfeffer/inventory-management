
import { 
    Request, 
    Response 
} from "express";
import { 
    addOrder, 
    batchDeleteOrder, 
    deleteOrder, 
    getAllOrders, 
    getOrderById, 
    upadateOrder 
} from "server/models/order-model";

export const getOrders = (_req: Request, res: Response) => {
    const orders = getAllOrders();
    res.json(orders);
};

export const getOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const order = getOrderById(id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: "Order not found" });
    }
};

export const createOrder = (req: Request, res: Response) => {
    const { date, customerId, status, total } = req.body;
    const newOrder = addOrder({ date, customerId, status, total });
    res.status(201).json(newOrder);
};

export const editOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { date, customerId, status, total } = req.body;
    upadateOrder(id, { date, customerId, status, total });
    res.status(204).send();
};

export const removeOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteOrder(id);
    res.status(204).send();
};

export const batchRemoveOrder = (req: Request, res: Response) => {
    const ids = req.body;
    batchDeleteOrder(ids);
    res.status(204).send();
};