import { randomUUID } from "node:crypto";

import { Pet, Prisma } from "@prisma/client";
import { FindManyProps, PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            description: data.description,
            specie: data.specie,
            age: data.age,
            size: data.size,
            independence_level: data.independence_level,
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

    async findManyByQuery({
        city,
        age,
        energyLevel,
        independenceLevel,
        size,
        specie,
      }: FindManyProps) {
        let petsFiltered = this.items;
    
        if (energyLevel) {
            petsFiltered = petsFiltered.filter(
                (item) => Number(item.energy_level) === Number(energyLevel),
            )
        }
    
        if (age) {
          petsFiltered = petsFiltered.filter((item) => item.age === age)
        }
    
        if (independenceLevel) {
          petsFiltered = petsFiltered.filter(
            (item) => item.independence_level === independenceLevel,
          )
        }
    
        if (size) {
          petsFiltered = petsFiltered.filter((item) => item.size === size)
        }
    
        if (specie) {
          petsFiltered = petsFiltered.filter((item) => item.specie === specie)
        }
    
        return petsFiltered
      }
}