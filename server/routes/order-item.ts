import express from "express";
import {
    createOrderItem,
    editOrderItem,
    getOrderItemsByOrder,
    getOrdersItems,
    removeOrderItem
} from "server/controllers/order-item-controller";

const router = express.Router();

router.get("/items", getOrdersItems);
router.get("/:orderId/items", getOrderItemsByOrder);
router.post("/:orderId/items", createOrderItem);
router.put("/:orderId/items/:itemId", editOrderItem);
router.delete("/items/:itemId", removeOrderItem);

export default router;
