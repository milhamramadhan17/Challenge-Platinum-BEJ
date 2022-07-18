module.exports = {
    '/api/seller/register': {
      post: {
        tags: [ 'seller' ],
        summary: 'Register new seller',
        description: 'Register new seller',
        operationId: 'register',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  password: {
                    type: 'string',
                  },
                },
                required: [
                  'name',
                  'email',
                  'password'
                ]
              }
            }
          }
        },
        responses: {
          200: {
            content: {
              'application/json': {
                example: {
                  status: 201,
                  message: 'Seller successfully registered',
                }
              }
            }
          },
          500: {
            content: {
              'application/json': {
                example: {
                  status: 500,
                  message: 'Internal server error',
                }
              }
            }
          }
        }
      }
    },
    '/api/seller/login': {
      post: {
        tags: ['seller'],
        summary: 'Login as seller',
        description: 'Login as seller',
        operationId: 'login',
        requestBody: {
          required: true,
          content: {
            'application/x-www-form-urlencoded': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string'
                  },
                  password: {
                    type: 'string',
                  },
                },
                required: [
                  'email',
                  'password'
                ]
              }
            }
          },
        },
        responses: {
          201: {
            content: {
              'application/json': {
                example: {
                  status: 201,
                  message: 'Successfully login as seller',
                }
              }
            }
          },
          400: {
            content: {
              'application/json': {
                example: {
                  status: 404,
                  message: 'Seller not found',
                }
              }
            }
          },
          500: {
            content: {
              'application/json': {
                example: {
                  status: 500,
                  message: 'Internal server error',
                }
              }
            }
          }
        }
      }
    }
  }