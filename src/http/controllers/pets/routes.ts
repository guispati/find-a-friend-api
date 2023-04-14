import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";

export async function petRoutes(app: FastifyInstance) {
    /* Authenticated */
    app.post('/pets', { onRequest: [verifyJWT] }, create);
}

