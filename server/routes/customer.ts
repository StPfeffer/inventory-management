import express from "express";
import {
    getCustomers,
    getCustomer,
    createCustomer,
    editCustomer,
    removeCustomer,
    batchRemoveCustomer
} from "../controllers/customer-controller";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomer);
router.put("/:id", editCustomer);
router.delete("/:id", removeCustomer);
router.post("/batch", batchRemoveCustomer);

export default router;
