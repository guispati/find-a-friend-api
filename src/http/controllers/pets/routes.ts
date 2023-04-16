import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { details } from "./details";

export async function petRoutes(app: FastifyInstance) {
    app.get('/pets/:petId', details);
    
    /* Authenticated */
    app.post('/pets', { onRequest: [verifyJWT] }, create);

}

