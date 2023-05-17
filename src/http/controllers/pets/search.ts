import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, response: FastifyReply) {
    const searchPetsParamsSchema = z.object({
        city: z.string(),
    });

    const searchPetsQuerySchema = z.object({
        age: z.enum(['puppy', 'adult', 'senior']).optional(),
        energyLevel: z.coerce.number().min(1).max(5).optional(),
        independenceLevel: z.enum(['low', 'medium', 'high']).optional(),
        size: z.enum(['mini', 'small', 'medium', 'big']).optional(),
        specie: z.enum(['dog', 'cat']).optional(),
    });

    const { city } = searchPetsParamsSchema.parse(request.params);
    const { age, energyLevel, independenceLevel, size, specie } = searchPetsQuerySchema.parse(
        request.query,
    );

    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({
        city,
        age: age ?? undefined,
        energyLevel: energyLevel ?? undefined,
        independenceLevel: independenceLevel ?? undefined,
        size: size ?? undefined,
        specie: specie ?? undefined,
    });

    return response.status(200).send({
        pets,
    });
}