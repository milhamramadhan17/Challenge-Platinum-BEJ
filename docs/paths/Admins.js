module.exports = {

    '/api/admin/register': {
        post: {
            tags: ['Admin'],
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
                                profile: {
                                    type: 'string',
                                    format: 'binary',
                                }
                            },
                            required: ['name', 'email', 'password', 'profile'],
                        },
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Admin added successfully',
                    content: {
                        'application/json': {
                            example: {
                                status: '201',
                                message: 'Register successfully',
                            }
                        }
                    }
                },
                '401': {
                    description: 'Email already exists',
                    content: {
                        'application/json': {
                            example: {
                                status: '401',
                                message: 'Email already exists',
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
            }
        }
    },

    '/api/admin/login': {
        post: {
            tags: ['Admin'],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                },
                                password: {
                                    type: 'string',
                                },
                            },
                            required: ['email', 'password'],
                        },
                    }
                }
            },
            responses: {
                '200': {
                    description: 'Login successfully',
                    content: {
                        'application/json': {
                            example: {
                                message: 'Login successfully',
                                token: 'asdbqiwudbuqwdb8129d12dnaksmdni12hdn1928naskjdn8i12dn182n1289n1212kasda'
                            }
                        }
                    }
                },
                '401': {
                    description: 'Email or password is incorrect',
                    content: {
                        'application/json': {
                            example: {
                                status: '401',
                                message: 'Email or password is incorrect',
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
            }
        }
    },

    '/api/admin/admins': {
        get: {
            tags: ['Admin'],
            responses: {
                '200': {
                    description: 'Get all admins',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Admins',
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