import express from "express";

import productRoutes from "./products";
import customerRoutes from "./customer";
import supplierRoutes from "./supplier";
import transactionRoutes from "./transaction";

const router = express.Router();

router.use("/products", productRoutes);
router.use("/customers", customerRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/transactions", transactionRoutes);

export default router;
