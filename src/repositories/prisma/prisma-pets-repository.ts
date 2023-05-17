import { Prisma } from '@prisma/client';

import { prisma } from "@/lib/prisma";
import { FindManyProps, PetsRepository } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        });

        return pet;
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            },
        });

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
        const pets = await prisma.pet.findMany({
            where: {
                size,
                org: {
                    address: {
                        city,
                    },
                },
                age,
                energy_level: energyLevel,
                independence_level: independenceLevel,
                specie,
            },
        });
        
        return pets;
    }
}