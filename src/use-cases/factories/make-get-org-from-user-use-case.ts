import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgFromUserUseCase } from "../get-org-from-user";

export function makeGetOrgFromUserUseCase() {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const getOrgFromUserUseCase = new GetOrgFromUserUseCase(prismaOrgsRepository);

    return getOrgFromUserUseCase;
}