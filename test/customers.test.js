const app = require('../server');
const request = require('supertest');
const { Customers } = require('../models/Customers');
const { url } = require('../config/cloudinary.config');

const testCustomers = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword',
  photo: url
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

afterAll(() => {
  Customers.findAll({
    where: {
      email: testCustomers.email
    }
  })
});

describe('Customers Endpoints', () => {
  it('POST /api/customer/register with valid values, response should be 200', async () => {
    const res = await request(app)
      .post('/api/customer/register')
      .send(testCustomers)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /api/customer/register without password, response should be 400', async () => {
    const res = await request(app)
      .post('/api/customer/register')
      .send({ name: 'Test invalid', email: 'test@invalid.com' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /api/customer/register without email, response should be 400', async () => {
    const res = await request(app)
      .post('/api/customer/register')
      .send({ name: 'Test invalid', pass: 'pass' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /api/customer/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/api/customer/login')
      .set('Accept', 'application/json')
      .send({
        email: testCustomers.email,
        password: testCustomers.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('GET /customers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/customers')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('list');
  })

  it('GET /customers without token, response should be 404.', async () => {
    const response = await request(app)
      .get('/customers')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
    expect(typeof response.body.message).toMatch('string');
  })

  it('GET /customers with invalid token, response should be 404.', async () => {
    const response = await request(app)
      .get('/customers')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Token invalid. Try to logout and login again.');
  })
})