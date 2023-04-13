import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";

import { Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: await hash('123456', 6),
            role: data.role as Role,
            created_at: new Date(),
        }

        this.items.push(user);

        return user;
    }

    async findByEmail(email: string)  {
        const user = this.items.find(item => item.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

    async findById(id: string)  {
        const user = this.items.find(item => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

}