import { Age, IndependenceLevel, Pet, Size, Specie } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";

interface SearchPetsUseCaseRequest {
    city: string;
    age: Age | undefined;
    independenceLevel: IndependenceLevel | undefined;
    energyLevel: number | undefined;
    size: Size | undefined;
    specie: Specie | undefined;
}

interface SearchPetsUseCaseResponse {
    pets: Pet[];
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute(data: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
        const pets = await this.petsRepository.findManyByQuery(data);

        return {
            pets,
        }
    }
}
