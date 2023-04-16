import { expect, describe, it, beforeEach } from 'vitest';

import { CreatePetUseCase } from './create-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        orgsRepository = new InMemoryOrgsRepository();

        sut = new CreatePetUseCase(petsRepository);
    });

    it('should be able to create a new pet', async () => {
        const org = await orgsRepository.create({
            name: 'Example Inc.',
            whatsapp: '+5511999999999',
            user_id: 'user-01',
            address_id: 'address-01',
        });

        const { pet } = await sut.execute({
            name: 'Dog',
            description: '3 years old dog',
            specie: 'dog',
            age: 'puppy',
            size: 'small',
            independenceLevel: 'medium',
            energyLevel: 5,
            orgId: org.id,
        });

        expect(pet.id).toEqual(expect.any(String));
        expect(pet.org_id).toEqual(org.id);
    });
});