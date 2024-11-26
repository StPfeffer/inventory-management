import express from "express";
import { batchRemoveOrder, createOrder, createOrderItem, editOrder, editOrderItem, getOrder, getOrderItemsByOrder, getOrders, getOrdersItems, removeOrder, removeOrderItem } from "server/controllers/order-controller";

const router = express.Router();

//ORDER

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", editOrder);
router.delete("/:id", removeOrder);
router.post("/batch", batchRemoveOrder);

//ORDER-ITEMS

router.get("/items", getOrdersItems); // List all items for a specific order
router.get("/:orderId/items", getOrderItemsByOrder); // Get a specific item by ID
router.post("/:orderId/items", createOrderItem); // Add a new item to an order
router.put("/:orderId/items/:itemId", editOrderItem); // Edit an item in an order
router.delete("/:orderId/items/:itemId", removeOrderItem);

export default router;
