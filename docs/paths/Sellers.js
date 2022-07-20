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
                  role:{
                    type: 'integer',
                    default: 2
                  }
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
          201: {
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
                  role: {
                    type: 'integer',
                    default: 2
                  }
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
          200: {
            content: {
              'application/json': {
                example: {
                  status: 200,
                  message: 'Successfully login as seller',
                }
              }
            }
          },
          401: {
            content: {
              'application/json': {
                example: {
                  status: 401,
                  message: 'Password is incorrect',
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
