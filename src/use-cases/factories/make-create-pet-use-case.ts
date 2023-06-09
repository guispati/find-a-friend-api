import { CreatePetUseCase } from "../create-pet";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";

export function makeCreatePetUseCase() {
    const prismaPetsRepository = new PrismaPetsRepository();
    const createPetUseCase = new CreatePetUseCase(prismaPetsRepository);

    return createPetUseCase;
}