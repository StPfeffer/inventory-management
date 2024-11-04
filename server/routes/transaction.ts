import express from "express";
import {
    getTransactions,
    getTransaction,
    createTransaction,
    editTransaction,
    removeTransaction,
} from "../controllers/transaction-controller";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);
router.put("/:id", editTransaction);
router.delete("/:id", removeTransaction);

export default router;
