require('dotenv').config();
const app = require('../../server');
const db = require('../../models');
const fs = require('fs');
const Sellers = db.Sellers;
const Items = db.Items;
const Op = db.Sequelize.Op;
const request = require('supertest');

const testItem = {
  name: 'Test',
  price: 100,
  store_name: 'Test',
  category: 'Test',
  brand: 'Test',
  status: 'ACTIVE',
}

const newItem = {
  name: 'Test2',
  price: '200',
  store_name: 'Test2',
  category: 'Test2',
  brand: 'Test2',
}

Upload = './files/Untitled Diagram.drawio.png';

let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

describe('Items Endpoints', () => { 
  //LOGIN SELLER
    it('POST /api/seller/login with valid email and pass, response should be 200', async () => {
      const res = await request(app)
        .post('/api/seller/login')
        .set('Accept', 'application/json')
        .send({
          email: process.env.LOGIN_EMAIL,
          password: process.env.LOGIN_PASSWORD
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toMatch('string');
        validToken = res.body.token;
    })

    it('POST /api/item/addItem with valid token, response should be 201', async () => {
      jest.setTimeout(5000);
      const res = await request(app)
        .post('/api/item/addItem')
        .field('name', testItem.name)
        .field('price', testItem.price)
        .field('store_name', testItem.store_name)
        .field('category', testItem.category)
        .field('brand', testItem.brand)
        .field('status', testItem.status)
        .attach('photo', Upload)
        .set('authorization', validToken)
        .set('Accept', 'application/x-www-form-urlencoded')
  
        expect(res.status).toBe(201);
        expect(typeof res.body.message).toMatch('string');
    }, 10000);

    it('POST /api/item/addItem with invalid token, response should be 401', async () => {
      jest.setTimeout(5000)
      const res = await request(app)
        .post('/api/item/addItem')
        .field('name', testItem.name)
        .field('price', testItem.price)
        .field('store_name', testItem.store_name)
        .field('category', testItem.category)
        .field('brand', testItem.brand)
        .field('status', testItem.status)
        .attach('photo', Upload)
        .set('authorization', invalidToken)
        .set('Accept', 'application/x-www-form-urlencoded')

        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toBe('string');
    })

    it('POST /api/item/addItem with no token, response should be 401', async () => {
      jest.setTimeout(5000)
      const res = await request(app)
        .post('/api/item/addItem')
        .field('name', testItem.name)
        .field('price', testItem.price)
        .field('store_name', testItem.store_name)
        .field('category', testItem.category)
        .field('brand', testItem.brand)
        .field('status', testItem.status)
        .attach('photo', Upload)
        .set('Accept', 'application/x-www-form-urlencoded')
        
        expect(res.status).toEqual(401);
        expect(typeof res.body.message).toBe('string');
    })

    it('GET /api/item/items with valid token, response should be 200.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('authorization', validToken)
        .set('Accept', 'application/json')
  
        expect(response.status).toEqual(200);
        expect(typeof response.body).toMatch('object');
      })

  
    it('GET /api/item/items without token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('Accept', 'application/json');
  
        expect(response.status).toEqual(401);
        expect(typeof response.body.message).toMatch('string');
      })
  
    it('GET /api/item/items with invalid token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items')
        .set('authorization', invalidToken)
        .set('Accept', 'application/json');
  
        expect(response.status).toEqual(401);
        expect(typeof response.body).toMatch('object');
        expect(response.body.message).toBe('Invalid token');
      })

    it('GET /api/item/items/:id with id, response should be 200.', async () => {
      const response = await request(app)
        .get('/api/item/items/307277a7-49a5-4487-98b2-3b5576907789')
        .set('authorization', validToken)
        .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(typeof response.body).toMatch('object');
      })

    it('GET /api/item/items/:id without token, response should be 401.', async () => {
      const response = await request(app)
        .get('/api/item/items/307277a7-49a5-4487-98b2-3b5576907789')
        .set('Accept', 'application/json');

        expect(response.status).toEqual(401);
        expect(typeof response.body).toMatch('object');
      })
          


      it('PUT /api/item/items/:id update item success, response should be 203.', async () => {
        const response = await request(app)
          .put('/api/item/items/307277a7-49a5-4487-98b2-3b5576907789')
          .send(newItem)
          .set('authorization', validToken)
          .set('Accept', 'application/json');
    
          expect(response.status).toBe(203);
          expect(typeof response.body.message).toMatch('string');
      })

      it('PUT /api/item/items/:id update item without token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/307277a7-49a5-4487-98b2-3b5576907789')
          .send(newItem)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body.message).toMatch('string');

      })

      it('PUT /api/item/items/:id update item with invalid token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/307277a7-49a5-4487-98b2-3b5576907789')
          .send(newItem)
          .set('authorization', invalidToken)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body).toMatch('object');
          expect(response.body.message).toBe('Invalid token');

      })

      it('PUT /api/item/items/delete/:id ACTICE to INACTIVE, response should be 203.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/307277a7-49a5-4487-98b2-3b5576907789')
          .field('status', 'INACTIVE')
          .set('authorization', validToken)
          .set('Accept', 'application/json');

          expect(response.status).toBe(203);
          expect(typeof response.body.message).toMatch('object');
      })

      it('PUT /api/item/items/delete/:id ACTICE to INACTIVE without token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/307277a7-49a5-4487-98b2-3b5576907789')
          .field('status', 'INACTIVE')
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body.message).toMatch('string');
      })

      it('PUT /api/item/items/delete/:id ACTICE to INACTIVE with invalid token, response should be 401.', async () => {
        const response = await request(app)
          .put('/api/item/items/delete/307277a7-49a5-4487-98b2-3b5576907789')
          .field('status', 'INACTIVE')
          .set('authorization', invalidToken)
          .set('Accept', 'application/json');

          expect(response.status).toBe(401);
          expect(typeof response.body).toMatch('object');
          expect(response.body.message).toBe('Invalid token');
      })
    
})

