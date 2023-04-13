import { hash } from "bcryptjs";
import { Address, Org, User } from "@prisma/client";

import { UsersRepository } from "../repositories/users-repository";
import { AddressesRepository } from "../repositories/addresses-repository";
import { OrgsRepository } from "../repositories/orgs-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    personName: string;
    email: string;
    password: string;
    orgName: string;
    whatsapp: string;
    zipcode: string;
    state: string;
    city: string;
    streetAddress: string;
}

interface RegisterUseCaseResponse {
    org: Org;
    user: User;
    address: Address;
}

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private addressesRepository: AddressesRepository,
        private orgsRepository: OrgsRepository,
    ) {}

    async execute({
        personName,
        email,
        password,
        orgName,
        whatsapp,
        zipcode,
        state,
        city,
        streetAddress,
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6);
        
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
    
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }
        
        const user = await this.usersRepository.create({
            name: personName,
            email,
            password_hash,
        });

        const address = await this.addressesRepository.create({
            zipcode,
            state,
            city,
            street_address: streetAddress,
        });

        const org = await this.orgsRepository.create({
            name: orgName,
            whatsapp,
            user_id: user.id,
            address_id: address.id
        });

        return {
            org,
            user,
            address
        }
    }
}
