    import { FastifyInstance } from "fastify";

    import { verifyJWT } from "@/http/middlewares/verify-jwt";
    import { authenticate } from "./authenticate";
    import { register } from "./register";
import { refresh } from "./refresh";

    export async function userRoutes(app: FastifyInstance) {
        app.post('/register', register);
        app.post('/sessions', authenticate);

        app.patch('/token/refresh', refresh);

        /* Authenticated */    
        /** TODO: acessar aplicação como admin */
        // app.get('/me', { onRequest: [verifyJWT] }, profile);
    }

