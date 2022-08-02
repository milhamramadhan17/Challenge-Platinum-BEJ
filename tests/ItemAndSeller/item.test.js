const app = require('../../server');
const request = require('supertest');
const { Items } = require('../../models/Items');

const testItem = {
  name: 'Test',
  price: '100',
  store_name: 'Test',
  category: 'Test',
  brand: 'Test'
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

describe('Items Endpoints', () => {
    it('POST /api/item/addItem with valid values, response should be 201', async () => {
      const res = await request(app)
        .post('/api/item/addItem')
        .send(testItem)
        .set('Accept', 'application/json');
  
        expect(res.status).toBe(201);
        expect(typeof res.body.message).toMatch('string');
    })
})

