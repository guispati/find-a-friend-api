import { Prisma, Org } from "@prisma/client";

export interface OrgsRepository {
    create(data: Prisma.OrgUncheckedCreateWithoutPetInput): Promise<Org>;
    findById(id: string): Promise<Org | null>;
}