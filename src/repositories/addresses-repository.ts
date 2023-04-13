import { Prisma, Address } from "@prisma/client";

export interface AddressesRepository {
    create(data: Prisma.AddressCreateInput): Promise<Address>;
    findById(id: string): Promise<Address | null>;
}