import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";

export async function create(request: FastifyRequest, response: FastifyReply) {
    const createCheckInBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        age: z.number(),
        size: z.enum(['mini', 'small', 'medium', 'big']),
        energyLevel: z.number().min(1).max(5),
    });

    const {
        name,
        description,
        age,
        size,
        energyLevel,
    } = createCheckInBodySchema.parse(request.body);

    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
        name,
        description,
        age,
        size,
        energyLevel,
        orgId: request.user.sub,
    });

    return response.status(201).send();
};