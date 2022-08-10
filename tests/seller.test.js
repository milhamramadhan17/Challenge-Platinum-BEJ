const app = require('../server');
const request = require('supertest');
const {Sellers} = require('../models/Sellers');


const testSeller = {
  name: 'Tester',
  email: 'test@mail.com',
  password: 'TestPassword',
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';



describe('Sellers Endpoints', () => {
   it('POST /seller/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/register')
      .send(testSeller)
      .set('Accept', 'application/json');
      
      expect(res.status).toBe(201);
      expect(typeof res.body.message).toMatch('string');
  })


  it('POST /api/seller/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        email: testSeller.email,
        password: testSeller.password
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(typeof res.body.token).toMatch('string');
      validToken = res.body.token;
    })

  it('GET /api/seller/sellers with valid token, response should be 200.', async () => {
    const response = await request(app)
    .set('authorization', validToken)
      .get('/sellers')
      .set('Accept', 'application/json')

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('list');
    })

    it('GET /api/seller/sellers without token, response should be 404.', async () => {
      const response = await request(app)
        .get('/sellers')
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(404);
      expect(typeof response.body.message).toMatch('undefined');
    })
  

    it('GET /api/seller/sellers with invalid token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/seller/sellers')
        .set('authorization', invalidToken)
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Invalid token');
    })
})