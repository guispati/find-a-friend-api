import { expect, describe, it, beforeEach } from 'vitest';

import { CreatePetUseCase } from './create-pet';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { randomUUID } from 'crypto';

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();

        sut = new CreatePetUseCase(petsRepository);
    });

    it('should be able to create a new pet', async () => {
        const { pet } = await sut.execute({
            name: 'Dog',
            description: '3 years old dog',
            age: 3,
            energyLevel: 5,
            size: 'small',
            orgId: 'org-01',
        });

        expect(pet.id).toEqual(expect.any(String));
    });
});