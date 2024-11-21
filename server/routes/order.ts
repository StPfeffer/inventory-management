import express from "express";
import { batchRemoveOrder, createOrder, editOrder, getOrder, getOrders, removeOrder } from "server/controllers/order-controller";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", editOrder);
router.delete("/:id", removeOrder);
router.post("/batch", batchRemoveOrder);

export default router;
