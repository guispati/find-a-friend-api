import { randomUUID } from "node:crypto";

import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = [];

    async create(data: Prisma.OrgUncheckedCreateWithoutPetInput) {
        const org = {
            id: randomUUID(),
            name: data.name,
            whatsapp: data.whatsapp,
            user_id: data.user_id,
            address_id: data.address_id,
        }

        this.items.push(org);

        return org;
    }

    async findById(id: string)  {
        const org = this.items.find(item => item.id === id);

        if (!org) {
            return null;
        }

        return org;
    }

}