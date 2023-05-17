import { Prisma, Pet, Age, IndependenceLevel, Size, Specie } from "@prisma/client";

export interface FindManyProps {
    city: string;
    age: Age | undefined;
    independenceLevel: IndependenceLevel | undefined;
    energyLevel: number | undefined;
    size: Size | undefined;
    specie: Specie | undefined;
}
export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
    findById(id: string): Promise<Pet | null>;
    findManyByQuery(data: FindManyProps): Promise<Pet[]>;
}