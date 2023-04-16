import { Age, IndependenceLevel, Pet, Size, Specie } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface CreatePetUseCaseRequest {
    name: string;
    description: string;
    specie: Specie;
    age: Age;
    size: Size;
    independenceLevel: IndependenceLevel;
    energyLevel: number;
    orgId: string;
}

interface CreatePetUseCaseResponse {
    pet: Pet;
}

export class CreatePetUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execute({
        name,
        description,
        specie,
        age,
        size,
        independenceLevel,
        energyLevel,
        orgId,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const pet = await this.petsRepository.create({
            name,
            description,
            specie,
            age,
            size,
            independence_level: independenceLevel,
            energy_level: energyLevel,
            org_id: orgId,
        });

        return {
            pet,
        }
    }
}
