import { randomUUID } from "node:crypto";

import { Address, Prisma } from "@prisma/client";
import { AddressesRepository } from "../addresses-repository";

export class InMemoryAddressesRepository implements AddressesRepository {
    public items: Address[] = [];

    async create(data: Prisma.AddressCreateInput) {
        const address = {
            id: randomUUID(),
            zipcode: data.zipcode,
            state: data.state,
            city: data.city,
            street_address: data.street_address,
        }

        this.items.push(address);

        return address;
    }

    async findById(id: string)  {
        const user = this.items.find(item => item.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

}