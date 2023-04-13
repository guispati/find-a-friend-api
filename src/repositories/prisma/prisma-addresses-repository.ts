import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';
import { AddressesRepository } from "../addresses-repository";

export class PrismaAddressesRepository implements AddressesRepository {
    async create(data: Prisma.AddressCreateInput) {
        const address = await prisma.address.create({
            data
        });

        return address;
    }

    async findById(id: string) {
        const address = await prisma.address.findUnique({
            where: {
                id,
            },
        });

        return address;
    }
}