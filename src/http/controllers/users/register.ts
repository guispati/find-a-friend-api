import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, response: FastifyReply) {
    const registerBodySchema = z.object({
        personName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        orgName: z.string(),
        whatsapp: z.string().refine((phone) => isMobilePhone(phone, 'pt-BR')),
        zipcode: z.string().refine((zipcode) => isPostalCode(zipcode, 'BR')),
        state: z.string(),
        city: z.string(),
        streetAddress: z.string(),
    });

    const { 
        personName,
        email,
        password,
        orgName,
        whatsapp,
        zipcode,
        state,
        city,
        streetAddress
    } = registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            personName,
            email,
            password,
            orgName,
            whatsapp,
            zipcode,
            state,
            city,
            streetAddress
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return response.status(409).send({
                message: err.message,
            });
        }

        throw err;
    }

    return response.status(201).send();
};