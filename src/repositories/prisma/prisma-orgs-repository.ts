import { prisma } from "@/lib/prisma";
import { Org, Prisma } from '@prisma/client';
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: Prisma.OrgUncheckedCreateWithoutPetInput) {
        const org = await prisma.org.create({
            data,
        });

        return org;
    }

    async findById(id: string) {
        const org = await prisma.org.findUnique({
            where: {
                id,
            },
        });

        return org;
    }

    async findByUserId(userId: string) {
        const org = await prisma.org.findUnique({
            where: {
                user_id: userId,
            },
        });

        return org;
    }
}