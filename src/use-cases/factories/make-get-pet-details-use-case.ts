import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "../get-pet-details";

export function makeGetPetDetailsUseCase() {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const prismaPetsRepository = new PrismaPetsRepository();
    const getOrgFromUserUseCase = new GetPetDetailsUseCase(prismaPetsRepository, prismaOrgsRepository);

    return getOrgFromUserUseCase;
}