import { Pet, Prisma } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidOrgError } from "./errors/invalid-org";

interface GetPetDetailsUseCaseRequest {
    id: string;
}

const petWithOrg = Prisma.validator<Prisma.UserArgs>()({
    include: { org: true },
});

type PetWithOrg = Prisma.PetGetPayload<typeof petWithOrg>

interface GetPetDetailsUseCaseResponse {
    pet: PetWithOrg;
}

export class GetPetDetailsUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository,
    ) {}

    async execute({
        id
    }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
        const pet = await this.petsRepository.findById(id);

        if (!pet) {
            throw new ResourceNotFoundError();
        }

        const org = await this.orgsRepository.findById(pet.org_id);

        if (!org) {
            throw new InvalidOrgError();
        }

        return {
            pet: {
                ...pet,
                org
            }
        }
    }
}