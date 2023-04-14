import { Pet } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface CreatePetUseCaseRequest {
    name: string;
    description: string;
    age: number;
    size: "mini" | "small" | "medium" | "big";
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
        age,
        size,
        energyLevel,
        orgId,
    }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const pet = await this.petsRepository.create({
            name,
            description,
            age,
            size,
            energy_level: energyLevel,
            org_id: orgId,
        });

        return {
            pet,
        }
    }
}
