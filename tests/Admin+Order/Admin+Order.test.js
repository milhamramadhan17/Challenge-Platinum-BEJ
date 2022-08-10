const app = require('../../server');
const db = require('../../models');
const fs = require('fs');
const Orders = db.orders;
const Admins = db.Admins;
const Customer = db.Customers;
const Op = db.Sequelize.Op;
const request = require('supertest');

let validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzYTFhOTUyLWJmM2MtNDk1ZS05NWY2LWZlMmFlYWI5NDg4ZSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNjYwMTE1OTgyLCJleHAiOjE2NjAxMTk1ODJ9.Sv6TIo1PB2Cv_x4sofe-qxNWo8Frf6FuSv7CYEvlwhE';
let invalidToken = 'Invalid-token-for-negative-cases';

const testAddOrder = {
    customer_id: "e47eedc0-27af-4995-8ddf-7a7a634b2f44",
    item_id: "a42334ab-46b0-4bbd-ad2d-e1a3571fff4a",
    qty: 80,
    status: "pending",
    payment_method: "cash"
}

const email = 'mimin1@gmail.com';
    afterAll(() => {
        Admins.destroy({
          where: {
            email: email
          }
        })
      });

Upload = './files/business-partnership.png';

describe('Admin and Order', () => {
    describe('Admin Endpoints', () => {

        it('POST /api/admin/register with valid values, response should be 201', async () => {
            const res = await request(app)
                .post('/api/admin/register')
                .field('name', 'mimin1')
                .field('email', 'mimin1@gmail.com')
                .field('password', '123456')
                .attach('profile', Upload)
                .set('Accept', 'application/json');

            expect(res.status).toBe(201);
            expect(typeof res.body.message).toMatch('string');
        })

        it('POST /api/admin/register with email has been ready, response should be 400', async () => {
            const res = await request(app)
                .post('/api/admin/register')
                .field('name', 'mimin1')
                .field('email', 'mimin1@gmail.com')
                .field('password', '123456')
                .attach('profile', Upload)
                .set('Accept', 'application/json');

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error.message');
            expect(typeof res.body.message).toBe('undefined');
        })

        it('POST /api/admin/register without password, response should be 400', async () => {
            const res = await request(app) 
                .post('/api/admin/register')
                .send({
                    name: 'test01',
                    email: 'test01@gmail.com',
                    role: 1,
                    profile: ''
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(400);
            expect(typeof res.body.message).toMatch('string'); 
        })

        it('POST /api/admin/login with valid values, response should be 200', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .set('Accept', 'application/json')
                .send({
                    email: 'shopee@gmail..com',
                    password: 'shopee'
                })

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(typeof res.body.token).toMatch('string');
            validToken = res.body.token;
        })

        it('POST /api/admin/login with invalid password, response should be 400', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                    email: 'shopee@gmail..com',
                    password: 'shopee1'
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it('POST /api/admin/login with invalid email, response should be 400', async () => {
            const res = await request(app)
                .post('/api/admin/login')
                .send({
                    email: 'shopee1@gmail..com',
                    password: 'shopee'
                })
                .set('Accept', 'application/json');

            expect(res.status).toBe(401);
            expect(typeof res.body.message).toMatch('undefined');
        })

        it ('GET /api/admin/admins with valid token, response should be 200', async () => {
            const res = await request(app)
                .get('/api/admin/admins')
                .set('Accept', 'application/json')
                .set('authorization', validToken);

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('list');
        })

        it ('GET /api/admin/admins with invalid token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/admin/admins')
                .set('Accept', 'application/json')
                .set('authorization', invalidToken)

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('message');
            expect(typeof res.body.message).toBe('string');
        })

        it('GET /api/admin/admins with without token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/admin/admins')
                .set('Accept', 'application/json')

            expect(res.status).toEqual(401);
            expect(typeof res.body.message).toMatch('string');
        })
    })
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POST /api/order/addOrders<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Order Endpoints', () => {
        it('POST /api/order/addOrders with valid values, response should be 201', async () => {
            const res = await request(app)
                .post('/api/order/addOrders')
                .set('Accept', 'application/json')
                .set('authorization', validToken)
                .field('customer_id', "b9f8f8f8-f8f8-f8f8-f8f8-f8f8f8f8f8f8")
                .field('item_id', "3bbf7a16-cc36-4a11-9182-26f57b441bc9")
                .field('qty', 80)
                .field('status', "pending")
                .field('payment_method', "cash")

            expect(res.status).toBe(201)
            expect(typeof res.body).toMatch('string')
            
        })

        it('POST /api/order/addOrders with invalid token, response should be 401', async () => {
            const res = await request(app)
                .post('/api/order/addOrders')
                .send(testAddOrder)
                .set('Accept', 'application/json')
                .set('authorization', invalidToken)

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('message');
            expect(typeof res.body.message).toBe('string');
        })

        it('POST /api/order/addOrders with without token, response should be 401', async () => {
            const res = await request(app)
                .post('/api/order/addOrders')
                .send(testAddOrder)
                .set('Accept', 'application/json')

            expect(res.status).toEqual(401);
            expect(typeof res.body.message).toMatch('string');
        })
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> POST /api/order/addOrders<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        it('POST /api/order/addOrders invalid customer_id, response should be 404', async () => {
            const res = await request(app)
                .post('/api/order/addOrders')
                .set('Accept', 'application/json')
                .set('authorization', validToken)
                .field('customer_id', "T75c070f-06ce-4d16-b640-34492bb3069e")
                .field('item_id', "3bbf7a16-cc36-4a11-9182-26f57b441bc9")
                .field('qty', "80")
                .field('status', "pending")
                .field('payment_method', "cash")

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('error.message');
            expect(typeof res.body.message).toBe('undefined');
        })

        it('POST /api/order/addOrders invalid item_id, response should be 401', async () => {
            const res = await request(app)
                .post('/api/order/addOrders')
                .set('Accept', 'application/json')
                .set('authorization', validToken)
                .send({
                    customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e",
                    item_id: "4bbf7a16-cc36-4a11-9182-26f57b441bc9",
                    qty: 80,
                    status: "pending",
                    payment_method: "cash"
                })

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('error.message');
            expect(typeof res.body.message).toBe('undefined');
        })

     // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/cusId <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 

        it('GET /api/order/orders/cusId with valid token, response should be 200', async () => {
            const res = await request(app)
                .get('/api/order/orders/cusId')
                .send({
                    customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e"
                })
                .set('Accept', 'application/json')
                .set('authorization', validToken)

            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('data');
        })

        it('GET /api/order/orders/cusId with invalid token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/order/orders/cusId')
                .send({
                    customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e"
                })
                .set('Accept', 'application/json')
                .set('authorization', invalidToken)

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('message');
            expect(typeof res.body.message).toBe('string');
        })

        it('GET /api/order/orders/cusId with without token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/order/orders/cusId')
                .send({
                    customer_id: "d75c070f-06ce-4d16-b640-34492bb3069e"
                })
                .set('Accept', 'application/json')

            expect(res.status).toEqual(401);
            expect(typeof res.body.message).toMatch('string');
        })

        it('GET /api/order/orders/cusId with invalid customer_id, response should be 401', async () => {
            const res = await request(app)
                .get('/api/order/orders/cusId')
                .send({
                    customer_id: "q75c070f-06ce-4d16-b640-34492bb3069e"
                })
                .set('Accept', 'application/json')
                .set('authorization', validToken)

            expect(res.status).toEqual(401);
            expect(res.body).toHaveProperty('error.message');
            expect(typeof res.body.message).toBe('undefined');
        })

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET /api/order/orders/:id <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        it('GET /api/order/orders/:id with valid token, response should be 200', async () => {
            const res = await request(app)
                .get('/api/order/orders/:id')
                .send({
                    id: "9564fdd1-7808-491e-8100-3e96002f356f"
                })
                .set('Accept', 'application/json')
                .set('authorization', validToken)

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('dataOrders');
        })
        

        it('GET /api/order/orders/:id with invalid token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/order/orders/:id')
                .send({
                    id: "9564fdd1-7808-491e-8100-3e96002f356f"
                })
                .set('Accept', 'application/json')
                .set('authorization', invalidToken)

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('message');
        })

        it('GET /api/order/orders/:id with without token, response should be 401', async () => {
            const res = await request(app)
                .get('/api/order/orders/:id')
                .send({
                    id: "9564fdd1-7808-491e-8100-3e96002f356f"
                })
                .set('Accept', 'application/json')

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('message');
        })

        it('GET /api/order/orders/:id with wrong id, response should be 404', async () => {
            const res = await request(app)
                .get('/api/order/orders/:id')
                .send({
                    id: "x564fdd1-7808-491e-8100-3e96002f356f"
                })
                .set('Accept', 'application/json')
                .set('authorization', validToken)


            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error.message');
        })

        // it('PUT /api/order/orders/:id with valid token, response should be 200', async () => {
        //     const res = await request(app)
        //         .put('/api/order/orders/:id')
        //         .send({
        //             id: "9564fdd1-7808-491e-8100-3e96002f356f",
        //             status: "pending"
        //         })
        //         .set('Accept', 'application/json')
        //         .set('authorization', validToken)

        //     expect(res.status).toBe(200);
        //     expect(res.body).toHaveProperty('dataOrders');
        // })
    })
})


