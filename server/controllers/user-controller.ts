import {
    Request,
    Response
} from "express";
import {
    addUser,
    deleteUser,
    batchDeleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from "server/models/user-model";

export const getUsers = (_req: Request, res: Response) => {
    const users = getAllUsers();
    res.json(users);
};

export const getUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
};

export const createUser = (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const newUser = addUser({ name, email, password });
    res.status(201).json(newUser);
};

export const editUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { name, email, password } = req.body;
    updateUser(id, { name, email, password });
    res.status(204).send();
};

export const removeUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    deleteUser(id);
    res.status(204).send();
};

export const batchRemoveUser = (req: Request, res: Response) => {
    const ids = req.body;
    batchDeleteUser(ids);
    res.status(204).send();
};