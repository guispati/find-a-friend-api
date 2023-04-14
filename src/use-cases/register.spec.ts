import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { RegisterUseCase } from './register';
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository';
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let orgsRepository: InMemoryOrgsRepository;
let addressesRepository: InMemoryAddressesRepository;
let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        addressesRepository = new InMemoryAddressesRepository();
        usersRepository = new InMemoryUsersRepository();

        sut = new RegisterUseCase(usersRepository, addressesRepository, orgsRepository);
    });

    it('should be able to register', async () => {
        const { org } = await sut.execute({
            personName: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            orgName: 'Example Inc.',
            zipcode: '05639-100',
            state: 'São Paulo',
            city: 'São Paulo',
            whatsapp: '+5511999999999',
            streetAddress: 'Rua 1',
        });

        expect(org.id).toEqual(expect.any(String));
    });

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            personName: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            orgName: 'Example Inc.',
            zipcode: '05639-100',
            state: 'São Paulo',
            city: 'São Paulo',
            whatsapp: '+5511999999999',
            streetAddress: 'Rua 1',
        });

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with same email twice', async () => {
        const email = 'johndoe@example.com';

        await sut.execute({
            personName: 'John Doe',
            email,
            password: '123456',
            orgName: 'Example Inc.',
            zipcode: '05639-100',
            state: 'São Paulo',
            city: 'São Paulo',
            whatsapp: '+5511999999999',
            streetAddress: 'Rua 1',
        });

        await expect(() => 
            sut.execute({
                personName: 'John Doe',
                email,
                password: '123456',
                orgName: 'Example Inc.',
                zipcode: '05639-100',
                state: 'São Paulo',
                city: 'São Paulo',
                whatsapp: '+5511999999999',
                streetAddress: 'Rua 1',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});