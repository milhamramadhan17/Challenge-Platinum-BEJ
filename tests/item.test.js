const app = require('../server');
const request = require('supertest');

const testItem = {
  name: 'Test',
  price: '100',
  store_name: 'Test',
  category: 'Test',
  brand: 'Test'
}

const newItem = {
  name: 'Test2',
  price: '200',
  store_name: 'Test2',
  category: 'Test2',
  brand: 'Test2'
}

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';



describe('Items Endpoints', () => {
    it('POST /api/item/addItem with valid values, response should be 201', async () => {
      const res = await request(app)
          .post('/api/item/addItem')
          .set('authorization', validToken)
          .send(testItem)
          .set('Accept', 'application/json');

          expect(res.status).toBe(201);
          expect(typeof res.body.message).toMatch('string');
        })

    it('POST /api/item/addItem add item unauthorized, response should be 401', async () => {
      const res = await request(app)
          .post('/api/item/addItem')
          .send(testItem)
          .set('Accept', 'application/json');

          expect(res.status).toBe(401);
          expect(typeof res.body.message).toMatch('string');
        })

      it('GET /api/item/items get all items success, response should be 200.', async () => {
        const response = await request(app)
          .get('/api/item/items')
          .set('authorization', validToken)
          .set('Accept', 'application/json')
    
          expect(response.status).toEqual(200);
          expect(response.body).toHaveProperty('list');
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
  
      it('GET /api/item/items without token, response should be 404.', async () => {
        const response = await request(app)
          .get('/items')
          .set('Accept', 'application/json');

          expect(response.status).toEqual(404);
          expect(typeof response.body.message).toMatch('undefined');
        })
        
      it('PUT /api/item/items/:id update item success, response should be 203.', async () => {
        const res = await request(app)
          .put('/api/item/items/:id')
          .set('authorization', validToken)
          .send(newItem)
          .set('Accept', 'application/json');
    
          expect(res.status).toBe(203);
          expect(typeof res.body.message).toMatch('string');
      })

      it('PUT /api/item/items/:id update item unauthorized, response should be 401.', async () => {
        const res = await request(app)
          .put('/api/item/items/:id')
          .send(newItem)
          .set('Accept', 'application/json');
    
          expect(res.status).toBe(401);
          expect(typeof res.body.message).toMatch('string');
      })

      it('DELETE /api/item/items/:id delete item success, response should be 204.', async () => {
        const res = await request(app)
          .delete('/api/item/items/:id')
          .set('authorization', validToken)
          .set('Accept', 'application/json');
    
          expect(res.status).toBe(203);
          expect(typeof res.body.message).toMatch('string');
      })

      it('DELETE /api/item/items/:id delete item unauthorized, response should be 401.', async () => {
        const res = await request(app)
          .delete('/api/item/items/:id')
          .set('Accept', 'application/json');
    
          expect(res.status).toBe(401);
          expect(typeof res.body.message).toMatch('string');
      })

  
    
    
})

