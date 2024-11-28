import {
    Request,
    Response
} from "express";
import {
    getAllOrderItems,
    getOrderItemsByOrderId,
    addOrderItem,
    updateOrderItem as updateOrderItem,
    deleteOrderItem,
    batchDeleteOrderItems
} from "server/models/order-item-model";

export const getOrdersItems = (_req: Request, res: Response) => {
    const orderItems = getAllOrderItems();
    res.json(orderItems);
};

export const getOrderItemsByOrder = (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId, 10);
    const orderItem = getOrderItemsByOrderId(orderId);

    if (orderItem) {
        res.json(orderItem);
    } else {
        res.status(404).json({ error: "Order items not found" });
    }
};

export const createOrderItem = (req: Request, res: Response) => {
    const { orderId, product, quantity, unitPrice } = req.body;
    const newOrderItem = addOrderItem({ orderId, product, quantity, unitPrice });

    res.status(201).json(newOrderItem);
};

export const editOrderItem = (req: Request, res: Response) => {
    const id = parseInt(req.params.orderId, 10);
    const { orderId, product, quantity, unitPrice } = req.body;

    updateOrderItem(id, { orderId, product, quantity, unitPrice });

    res.status(204).send();
};

export const removeOrderItem = (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId, 10);
    deleteOrderItem(orderId);
    res.status(204).send();
};

export const batchRemoveOrderItems = (req: Request, res: Response) => {
    const ids = req.body;
    batchDeleteOrderItems(ids);
    res.status(204).send();
};