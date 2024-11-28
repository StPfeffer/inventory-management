
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
    updateOrder as update,
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
    const { date, customer, status, total } = req.body;
    const newOrder = addOrder({ date, customer, status, total });

    res.status(201).json(newOrder);
};

export const editOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { date, customer, status, total } = req.body;

    update(id, { date, customer, status, total });

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
