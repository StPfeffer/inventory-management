import express from "express";
import {
    createOrderItem,
    editOrderItem,
    getOrderItemsByOrder,
    getOrdersItems,
    removeOrderItem
} from "server/controllers/order-item-controller";
import { batchRemoveProduct } from "server/controllers/product-controller";

const router = express.Router();

router.get("/items", getOrdersItems);
router.get("/:orderId/items", getOrderItemsByOrder);
router.post("/:orderId/items", createOrderItem);
router.put("/:orderId/items/:itemId", editOrderItem);
router.delete("/items/:itemId", removeOrderItem);
router.post("/batch", batchRemoveProduct);

export default router;
