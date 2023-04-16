import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { makeGetOrgFromUserUseCase } from "@/use-cases/factories/make-get-org-from-user-use-case";

export async function create(request: FastifyRequest, response: FastifyReply) {
    const createCheckInBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        specie: z.enum(['dog', 'cat']),
        age: z.enum(['puppy', 'adult', 'senior']),
        size: z.enum(['mini', 'small', 'medium', 'big']),
        independenceLevel: z.enum(['low', 'medium', 'high']),
        energyLevel: z.number().min(1).max(5),
    });

    const {
        name,
        description,
        specie,
        age,
        size,
        independenceLevel,
        energyLevel,
    } = createCheckInBodySchema.parse(request.body);

    const getOrgFromUserUseCase = makeGetOrgFromUserUseCase();

    const { org } = await getOrgFromUserUseCase.execute({
        userId: request.user.sub
    });

    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
        name,
        description,
        specie,
        age,
        size,
        independenceLevel,
        energyLevel,
        orgId: org.id,
    });

    return response.status(201).send();
};