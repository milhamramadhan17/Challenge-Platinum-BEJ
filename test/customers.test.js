const app = require('../server');
const request = require('supertest');


describe('Customers Endpoints', () => {
    it('GET /customer without token, response should be 401.', async () => {
      const response = await request(app)
        .get('/customer')
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty('message');
    })
  
    it('GET /customer with invalid token, response should be 400.', async () => {
      const response = await request(app)
        .get('/customer')
        .set('authorization', 'Invalid-token-for-testing-negative-case')
        .set('Accept', 'application/json');
  
      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Token invalid. Try to logout and login again.');
    })
  
  })