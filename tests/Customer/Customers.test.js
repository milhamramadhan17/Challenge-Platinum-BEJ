const app = require('../../server');
const request = require('supertest');
const {Customers} = require('../../models/Customers');
const { authentication, authorization } = require('../../authmiddleware/auth');
const { url } = require('../../cloudinary.config');
const {Customers} = require('../../models/Customers');


const testCustomer =  {
  name: 'Tester',
  email: 'test',
  password: 'Password',
  photo: 'http://res.cloudinary.com/bej-binar/image/upload/v1659957950/20220808202546290_gz6ooy.png'
}
let validToken = '';
let invalidToken = 'Invalid-token-for-negative-cases';

afterAll(() => {
  Customers.destroy({
    where: {
      email: testCustomer.email
    }
  })
 });



// afterAll(() => {
//   Customers.create({
//     where: {
//       email: testCustomer.email
//     }
//   })
//  });


describe('Customers Endpoints', () => {
//   it('POST /api/customer/register with valid values, response should be 201', async () => {
//     const url = 'http://res.cloudinary.com/bej-binar/image/upload/v1659957950/20220808202546290_gz6ooy.png';
//     const res = await request(app)
//         .post('/api/customer/register')
//         .field('name', 'test')
//         .field('email', 'test@gmail.com')
//         .field('password', 'password')
//         .attach('photo', url)
//         .set('Accept', 'application/json');

//     expect(res.status).toBe(201);
//     expect(typeof res.body.message).toMatch('string');
// })

  
  it('POST /api/customer/register with valid values, response should be 201', async () => {
    const url = 'http://res.cloudinary.com/bej-binar/image/upload/v1659957950/20220808202546290_gz6ooy.png';
    const res = await request(app)
      .post('/api/customer/register')
      .send({ 
        name: 'Tester',
        email: 'test',
        password: 'password',
        role: 3,
        photo: url
       })
      .set('Accept', 'multipart/form-data');

    expect(res.status).toEqual(201);
    expect(typeof res.body.message).toMatch('string');
  })

  it('POST /api/customer/register without password, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Test invalid', email: 'test@invalid.com' })
      .set('Accept', 'multipart/form-data');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/register without email, response should be 404', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Test invalid', password: 'pass' })
      .set('Accept', 'multipart/form-data');

    expect(res.status).toBe(404);
    expect(typeof res.body.message).toMatch('undefined');
  })

  it('POST /api/customer/login with valid email and pass, response should be 201', async () => {
    const res = await request(app)
      .post('/api/customer/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        email: 'Tester',
        password: 'password'
      });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validToken = res.body.token;
  })

  it('GET /api/customer/customers with valid token, response should be 201.', async () => {
    const response = await request(app)
    .get('/api/customer/customers')
    .set('Accept', 'application/json')
    .set('authorization.Admins', validToken);

  expect(response.status).toEqual(201);
  expect(response.body).toHaveProperty('list');
  expect(typeof res.body.token).toMatch('string');
  validToken = res.body.token;
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