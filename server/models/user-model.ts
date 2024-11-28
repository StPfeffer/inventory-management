import db from "server/db";
import { User } from "shared/types/user";

export const getAllUsers = (): User[] => {
    const stmt = db.prepare("SELECT * FROM kf_user");

    return stmt.all() as User[];
};

export const getUserById = (id: number): User | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_user WHERE id = ?");

    return stmt.get(id) as User | undefined;
};

export const getUserByEmail = (email: string): User | undefined => {
    const stmt = db.prepare("SELECT * FROM kf_user WHERE email = ?");

    return stmt.get(email) as User | undefined;
}

export const addUser = (user: Omit<User, "id">): User => {
    const { name, email, password, role } = user;
    const stmt = db.prepare(
        "INSERT INTO kf_user (name, email, password, role) VALUES (?, ?, ?, ?)"
    );
    const info = stmt.run(name, email, password, role);

    return { id: info.lastInsertRowid as number, ...user };
};

export const updateUser = (id: number, user: Omit<User, "id">): void => {
    const { name, email, password, role } = user;
    const stmt = db.prepare(
        "UPDATE kf_user SET name = ?, email = ?, password = ?, role = ? WHERE id = ?"
    );
    console.log(password);

    stmt.run(name, email, password, role, id);
};

export const deleteUser = (id: number): void => {
    const stmt = db.prepare("DELETE FROM kf_user WHERE id = ?");

    stmt.run(id);
};

export const batchDeleteUser = (ids: number[]): void => {
    if (ids.length === 0) {
        return;
    }

    const placeholders = ids.map(() => "?").join(", ");
    const stmt = db.prepare(`DELETE FROM kf_user WHERE id IN (${placeholders})`);

    stmt.run(...ids);
}