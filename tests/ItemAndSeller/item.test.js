// const app = require('../../server');
// const request = require('supertest');
// const { Items } = require('../../models/Items');

// const testItem = {
//   name: 'Test',
//   price: '100',
//   store_name: 'Test',
//   category: 'Test',
//   brand: 'Test'
// }

// const newItem = {
//   name: 'Test2',
//   price: '200',
//   store_name: 'Test2',
//   category: 'Test2',
//   brand: 'Test2'
// }

// let validToken = '';
// let invalidToken = 'Invalid-token-for-negative-cases';

// describe('Items Endpoints', () => {
//     it('POST /api/item/addItem with valid values, response should be 201', async () => {
//       const res = await request(app)
//         .post('/api/item/addItem')
//         .send(testItem)
//         .set('Accept', 'application/json');
  
//         expect(res.status).toBe(201);
//         expect(typeof res.body.message).toMatch('string');
//     })

//     it('GET /api/item/items with valid token, response should be 200.', async () => {
//       const response = await request(app)
//         .get('/api/item/items')
//         .set('authorization', validToken)
//         .set('Accept', 'application/json')
  
//         expect(response.status).toEqual(200);
//         expect(response.body).toHaveProperty('list');
//       })
  
//     it('GET /api/item/items without token, response should be 401.', async () => {
//       const response = await request(app)
//         .get('/api/item/items')
//         .set('Accept', 'application/json');
  
//         expect(response.status).toEqual(401);
//         expect(typeof response.body.message).toMatch('string');
//       })
  
//     it('GET /api/item/items with invalid token, response should be 400.', async () => {
//       const response = await request(app)
//         .get('/api/item/items')
//         .set('authorization', invalidToken)
//         .set('Accept', 'application/json');
  
//         expect(response.status).toEqual(400);
//         expect(response.body).toHaveProperty('message');
//         expect(response.body.message).toBe('Token invalid. Try to logout and login again.');
//       })

//       it('PUT /api/item/items/:id update item success, response should be 203.', async () => {
//         const response = await request(app)
//           .put('/api/item/items/:id')
//           .send(newItem)
//           .set('Accept', 'application/json');
    
//           expect(res.status).toBe(203);
//           expect(typeof res.body.message).toMatch('string');
//       })

//       it('DELETE /api/item/items/:id delete item success, response should be 204.', async () => {
//         const response = await request(app)
//           .put('/api/item/items/:id')
//           .set('authorization', validToken)
//           .set('Accept', 'application/json');
    
//           expect(res.status).toBe(203);
//           expect(typeof res.body.message).toMatch('string');
//       })

  
    
    
// })

