
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
    upadateOrder,
    getAllOrderItems,
    getOrderItemsByOrderId,
    addOrderItem,
    upadateOrderItem,
    deleteOrderItem,
    batchDeleteOrderItems
} from "server/models/order-model";

//ORDER

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


//ORDER-ITEM

export const getOrdersItems = (_req: Request, res: Response) => {
    const orderItems = getAllOrderItems();
    res.json(orderItems);
};

export const getOrderItemsByOrder = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const orderItem = getOrderItemsByOrderId(id);
    if (orderItem) {
        res.json(orderItem);
    } else {
        res.status(404).json({ error: "Order items not found" });
    }
};

export const createOrderItem = (req: Request, res: Response) => {
    const { orderId, productId, quantity, unitPrice } = req.body;
    const newOrderItem = addOrderItem({ orderId, productId, quantity, unitPrice });
    res.status(201).json(newOrderItem);
};

export const editOrderItem = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { orderId, productId, quantity, unitPrice } = req.body;
    upadateOrderItem(id, { orderId, productId, quantity, unitPrice });
    res.status(204).send();
};

export const removeOrderItem = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteOrderItem(id);
    res.status(204).send();
};

export const batchRemoveOrderItems = (req: Request, res: Response) => {
    const ids = req.body;
    batchDeleteOrderItems(ids);
    res.status(204).send();
};



