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
            'multipart/form-data': {
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
                  photo: {
                    type: 'string',
                    format: 'binary',
                  }
                },
                required: [
                  'name',
                  'email',
                  'password',
                  'photo'
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
          401: {
            content: {
              'application/json': {
                example: {
                  status: 401,
                  message: 'Email already exists.',
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
    },
    '/api/seller/sellers': {
      get: {
          tags: ['seller'],
          responses: {
              '200': {
                  description: 'Get all sellers',
                  content: {
                      'application/json': {
                          schema: {
                              $ref: '#/components/schemas/Sellers',
                          },
                      }
                  }
              },
              '400': {
                  description: 'Bad request',
                  content: {
                      'application/json': {
                          example: {
                              status: '400',
                              message: 'Bad request 400 - Invalid request body',
                          }
                      }
                  }
              },
              '500': {
                  description: 'Internal server error',
                  content: {
                      'application/json': {
                          example: {
                              status: '500',
                              message: 'Internal server error',
                          }
                      }
                  }
              }
          },
          security: [
              {
                  'token': [
                      
                  ],
              }
          ]
      }
  }
  }
  
