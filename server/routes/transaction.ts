import express from "express";
import {
    getTransactions,
    getTransaction,
    createTransaction,
    editTransaction,
    removeTransaction,
    batchRemoveTransaction,
} from "../controllers/transaction-controller";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", removeTransaction);
router.post("/batch", batchRemoveTransaction);

export default router;
