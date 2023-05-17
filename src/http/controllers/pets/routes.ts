import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { details } from "./details";
import { search } from "./search";

export async function petRoutes(app: FastifyInstance) {
    app.get('/pets/:city', search);
    app.get('/pets/details/:petId', details);
    
    /* Authenticated */
    app.post('/pets', { onRequest: [verifyJWT] }, create);

}

