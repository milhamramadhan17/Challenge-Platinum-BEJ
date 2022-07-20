module.exports = {
  '/api/customer/register': {
    post: {
      tags: [ 'customer' ],
      summary: 'Register new customer',
      description: 'Register new customer',
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
                role: {
                  type: 'integer',
              }
              },
              required: [
                'name',
                'email',
                'password',
                'role'
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
                message: 'Customer successfully registered',
              }
            }
          }
        },
        400: {
          content: {
            'application/json': {
              example: {
                status: 404,
                message: 'customer not found',
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
  '/api/customer/login': {
    post: {
      tags: ['customer'],
      summary: 'Login as customer',
      description: 'Login as customer',
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
                message: 'Successfully login as customer',
              }
            }
          }
        },
        400: {
          content: {
            'application/json': {
              example: {
                status: 404,
                message: 'customer not found',
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
  "/api/customer/customers": {
    get: {
      tags: ["customer"],
      summary: "Find all customer",
      description: "This can only be done by the logged in customer.",
      operationId: "getAll",
      produces: [
        "application/json"
      ],
      parameters: [],
      responses: {
        201: {
          content: {
            'application/json': {
              example: {
                status: 201,
                message: 'Successfully login as customer',
              }
            }
          }
        },
        400: {
          content: {
            'application/json': {
              example: {
                status: 404,
                message: 'customer not found',
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

}
