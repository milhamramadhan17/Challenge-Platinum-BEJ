const userSchema = require('./schemas/Users');
const userPath = require('./paths/Users');
const itemsSchema = require('./schemas/Items');
const itemsPath = require('./paths/Items');
const ordersSchema = require('./schemas/Orders');
const ordersPath = require('./paths/Orders');
const customerSchema = require('./schemas/Customers');
const customerPath = require('./paths/Customers');
const adminSchema = require('./schemas/Admins');
const adminPath = require('./paths/Admins');
const sellersPath = require('./paths/Sellers');
const sellersSchema = require('./schemas/Sellers')



module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Swagger Bingle',
    description: 'How to use E-Commerce API',
    version: '1.0.0'
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Swagger Bingle'
    }
  ],


  paths: {
    ...userPath,
    ...itemsPath,
    ...ordersPath,
    ...customerPath,
    ...adminPath,
    ...sellersPath
  },
  components: {
    schemas: {
    ...userSchema,
    ...itemsSchema,
    ...ordersSchema,
    ...customerSchema,
    ...adminSchema,
    ...sellersSchema
    },
  },
  components: {
    securitySchemes: {
      token: {
        type: 'apiKey',
        description: 'Login to get token',
        in: 'header',
        name: 'authorization'
      }
    }
  },
}
