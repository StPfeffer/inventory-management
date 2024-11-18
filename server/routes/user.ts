import express from "express";
import {
    getUsers,
    getUser,
    createUser,
    editUser,
    removeUser,
    batchRemoveUser
} from "../controllers/user-controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);
router.post("/batch", batchRemoveUser);

export default router;
