import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { GetOrgFromUserUseCase } from './get-org-from-user';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InvalidOrgError } from './errors/invalid-org';

let orgsRepository: InMemoryOrgsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: GetOrgFromUserUseCase;

describe('Get Org Data From User ID', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        usersRepository = new InMemoryUsersRepository();
        sut = new GetOrgFromUserUseCase(orgsRepository);
    });

    it('should be able to get the org data from user id', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        });

        await orgsRepository.create({
            name: 'Example Inc.',
            whatsapp: '+5511999999999',
            user_id: createdUser.id,
            address_id: 'address-01',
        });

        const { org } = await sut.execute({
            userId: createdUser.id,
        });

        expect(org.id).toEqual(expect.any(String));
        expect(org.name).toEqual("Example Inc.");
    });

    it('should not be able to get the org data from a non existing user id', async () => {
        await expect(() => sut.execute({
            userId: 'non-existing-user-id',
        })).rejects.toBeInstanceOf(InvalidOrgError);
    });
});