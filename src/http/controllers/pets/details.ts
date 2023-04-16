import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case";

export async function details(request: FastifyRequest, response: FastifyReply) {
    const getPetDetailsParamsSchema = z.object({
        petId: z.string().uuid(),
    });

    const { petId } = getPetDetailsParamsSchema.parse(request.params);

    const getPetDetails = makeGetPetDetailsUseCase();

    const { pet } = await getPetDetails.execute({
        id: petId,
    });

    return response.status(200).send({
        user: {
            ...pet,
        },
    });
};