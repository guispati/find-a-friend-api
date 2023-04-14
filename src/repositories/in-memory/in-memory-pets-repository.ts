import { randomUUID } from "node:crypto";

import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description,
            age: data.age,
            size: data.size,
            energy_level: data.energy_level,
            org_id: data.org_id,
        }

        this.items.push(pet);

        return pet;
    }

    async findById(id: string)  {
        const pet = this.items.find(item => item.id === id);

        if (!pet) {
            return null;
        }

        return pet;
    }

}