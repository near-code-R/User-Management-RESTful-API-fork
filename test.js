import { it, describe } from 'node:test';
import supertest from 'supertest';
import bcrypt from "bcrypt";

import { app } from './server.js';
import assert from 'node:assert';
const request = supertest(app)

describe.skip('POST /api/user', () => {
    it.only('should can register success', async () => {
        const res = await request.post('/api/user/register').send({
            userName: 'hilmi',
            password: '12345',
            confirmPassword: '12345',
            name: 'deni'
        })
        console.log(res.body);
        // assert.strictEqual(res.statusCode, 200);
        // assert.strictEqual(res.body.data.userName, 'mubarok');
        // assert.strictEqual(res.body.data.name, 'deni');
        // assert.strictEqual(res.body.data.password, undefined);


    });
    it.skip('should can register rejected', async () => {
        const res = await request.post('/api/user').send({
            userName: 'dodis',
            password: '12345',
            confirmPassword: '12345',
            name: 'dodi'
        })
        assert.strictEqual(res.statusCode, 400);
        assert.strictEqual(res.body.data, undefined);
        assert.strictEqual(res.body.data, undefined);

    });

})
describe.skip('post login user', () => {
    it.only('check login success', async () => {
        const res = await request.post('/api/user/login').send({
            name: 'deni',
            password: '12345'
        })
        console.log(res.body);
        // assert.strictEqual(res.statusCode, 200)
    });
    // it.skip('check login reject', async () => {
    //     const res = await request.post('/api/login').send({
    //         name: '',
    //         password: ''
    //     })
    //     assert.strictEqual(res.statusCode, 401)
    //     assert.strictEqual(res.body.message, undefined)
    // })
})

describe.skip('GET /api/user/current', () => {
    const token = process.env.TOKEN
    it('handles GET /api/user/current', async () => {
        const response = await request.get('/api/user/current').set('Authorization', token);
        console.log(response.body);
    })
})
describe.only('PATCH /api/user/current', () => {
    const token = process.env.TOKEN;
    it('handles PATCH /api/user/current', async () => {
        const response = await request.patch('/api/user/current').set('Authorization', token).send({
            name: 'deni',
            password: '12345'
        });
        console.log(response.body);
        // assert.strictEqual(response.statusCode, 401)
    })
});

describe.skip('DELETE /api/user/logout', () => {
    it('should logout /api/user/logout', async () => {
        const token = process.env.TOKEN
        const response = await request.delete('/api/user/logout').set('Authorization', token);
        console.log(response.body);
        assert.strictEqual(response.statusCode, 401);
    })
})
// ROUTE CONTACT

describe.skip('GET /api/user/contact', () => {
    it('should get contact successfuly', async () => {
        const token = process.env.TOKEN
        const response = await request.get('/api/user/contact').set('Authorization', token);
        console.log(response.body);
    })
})
describe.skip('POST /api/user/contact', () => {
    it('should create a new contact', async () => {
        const token = process.env.TOKEN
        const response = await request.post('/api/user/contact').set('Authorization', token).send({
            firts_name: "acill",
            last_name: 'ganteng',
            phone_number: '948923849328',
            email: 'acil@gmail.com',
        });
        console.log(response.body);
    })
})
describe.skip('DELETE /api/user/contact', () => {
    it('should delete a contact', async () => {
        const token = process.env.TOKEN
        const response = await request.delete('/api/user/contact').set('Authorization', token);
        console.log(response.body);
    })
})