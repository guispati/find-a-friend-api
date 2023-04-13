import { RegisterUseCase } from "../register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const prismaAddressesRepository = new PrismaAddressesRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository, prismaAddressesRepository, prismaOrgsRepository);

    return registerUseCase;
}