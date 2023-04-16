import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateOrg(app: FastifyInstance, isAdmin = false) {
    const org = await prisma.org.create({
        data: {
            name: 'Example Inc.',
            whatsapp: '+5511999999999',
            user: {
                create: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    password_hash: '123456',
                    role: isAdmin ? 'ADMIN' : 'MEMBER',
                }
            },
            address: {
                create: {
                    zipcode: '05639-100',
                    state: 'São Paulo',
                    city: 'São Paulo',
                    street_address: 'Rua 1',
                }
            }
        },
    });

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'johndoe@example.com',
            password: '123456',
        });

    const { token } = authResponse.body;

    return {
        token,
    };
}