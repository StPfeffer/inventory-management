import express from "express";
import {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    removeProduct,
    batchRemoveProduct
} from "../controllers/product-controller";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);
router.post("/batch", batchRemoveProduct)

export default router;
