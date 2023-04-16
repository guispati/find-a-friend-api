import { Org } from "@prisma/client";

import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidOrgError } from "./errors/invalid-org";

interface GetOrgFromUserUseCaseRequest {
    userId: string;
}

interface GetOrgFromUserUseCaseResponse {
    org: Org;
}

export class GetOrgFromUserUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        userId
    }: GetOrgFromUserUseCaseRequest): Promise<GetOrgFromUserUseCaseResponse> {
        const org = await this.orgsRepository.findByUserId(userId);

        if (!org) {
            throw new InvalidOrgError();
        }

        return {
            org,
        }
    }
}