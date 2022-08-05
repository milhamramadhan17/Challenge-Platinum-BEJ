const app = require('../server');
const request = require('supertest');
const {Customers} = require('../models/Customers');


const testCustomer = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword',
  photo: 'url'
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

// afterAll(() => {
//   Customers.destroy({
//     where: {
//       email: testCustomer.email
//     }
//   })
//  });


describe('Customers Endpoints', () => {
  it('POST /api/customer/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/register')
      .send({ 
        name: testCustomer.name,
        email: testCustomer.email,
        password: testCustomer.password,
        role: 3,
        photo: testCustomer.photo
       })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(201);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /api/customer/register without password, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Test invalid', email: 'test@invalid.com' })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/register without email, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Test invalid', password: 'pass' })
      .set('Accept', 'application/x-www-form-urlencoded');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: testCustomer.email,
        password: testCustomer.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('GET /api/customer/customers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('Accept', 'application/json')
      .set('authorization', validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('list');
  })

  it('GET /api/customer/customers without token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
    expect(typeof response.body.message).toMatch('string');
  })

  it('GET /api/customer/customers with invalid token, response should be 401.', async () => {
    const response = await request(app)
      .get('/api/customer/customers')
      .set('authorization', invalidToken)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token');
  })
})