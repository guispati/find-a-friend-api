import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { GetPetDetailsUseCase } from './get-pet-details';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe('Get Pet Details Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        petsRepository = new InMemoryPetsRepository();
        sut = new GetPetDetailsUseCase(petsRepository, orgsRepository);
    });

    it('should be able to get pet details including org details given a pet id', async () => {
        const org = await orgsRepository.create({
            name: 'Example Inc.',
            whatsapp: '+5511999999999',
            user_id: 'user-01',
            address_id: 'address-01',
        });

        const createdPet = await petsRepository.create({
            name: 'Dog Doe',
            description: '3 years old dog',
            specie: 'dog',
            age: 'puppy',
            size: 'small',
            independence_level: 'medium',
            energy_level: 5,
            org_id: org.id,
        });        

        const { pet } = await sut.execute({
            id: createdPet.id
        });

        expect(pet.id).toEqual(expect.any(String));
        expect(pet.name).toEqual("Dog Doe");
    });

    it('should not be able to get pet details from a non existing user id', async () => {
        await expect(() => sut.execute({
            id: 'non-existing-pet-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});