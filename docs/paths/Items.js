module.exports = {
    
    '/api/item/addItem': {
        post: {
            tags: ['item'],
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
                                price: {
                                    type: 'number',
                                },
                                store_name: {
                                    type: 'string',
                                },
                                category: {
                                    type: 'string',
                                },
                                brand: {
                                    type: 'string',
                                }
                            },
                            required: [
                            'name', 
                            'price', 
                            'store_name', 
                            'category', 
                            'brand'],
                        },
                    }
                }
            },
            responses: {
                201: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '201',
                                message: 'Item added successfully',
                                
                            }
                        }
                    }
                },
                400: {
                    description: 'Name is empty',
                    content: {
                        'application/json': {
                            example: {
                                status: '201',
                                message: 'Name cannot be empty',
                                
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                status: '401',
                                message: 'Unauthorized. Please login as seller',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
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
    },

    'api/item/items': {
        get: {
            tags: ['item'],
            summary: 'Get all items',
            description: 'Get all items',
            operationId: 'getAll',
            responses: {
                200: {
                    content: {
                        'application/json': {
                            example: {
                                status: 200,
                                message: 'Getting all items successfully',
                            }

                        }
                    }
                },
                401: {
                    content: {
                        'application/json': {
                            example: {
                                status: 401,
                                message: 'Unauthorized',
                            }

                        }
                    }
                },
            },
            security: [
                {
                    token: []
                }
            ],
        }
    },
    'api/item/items/{id}': {
        get: {
            tags: ['item'],
            summary: 'Get item by id',
            description: 'Get item by id',
            operationId: 'getByID',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of an item that needs to be fetched',
                    required: true,
                    schema : {
                        type: 'integer',
                        format: 'int64'
                    }
                }
            ],
            responses: {
                200: {
                    content: {
                        'application/json': {
                            example: {
                                status: 200,
                                message: 'Getting item successfully',
                            }

                        }
                    }
                },
                401: {
                    content: {
                        'application/json': {
                            example: {
                                status: 401,
                                message: 'Unauthorized',
                            }

                        }
                    }
                },
            },
            security: [
                {
                    token: []
                }
            ],
        },
        put: {
            tags: ['item'],
            summary: 'Update an item',
            description: 'Update an item',
            operationId: 'getByID',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of an item that needs to be updated',
                    required: true,
                    schema : {
                        type: 'integer',
                        format: 'int64'
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded':{
                        schema:{
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                },
                                price: {
                                    type: 'number'
                                },
                                store_name: {
                                    type: 'string'
                                },
                                category: {
                                    type: 'string'
                                },
                                brand: {
                                    type: 'string'
                                },
                            },
                            required: [
                                'name',
                                'price',
                                'store_name',
                                'category',
                                'brand',
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
                                status: 200,
                                message: 'Updating item successfully',
                            }

                        }
                    }
                },
                401: {
                    content: {
                        'application/json': {
                            example: {
                                status: 401,
                                message: 'Unauthorized',
                            }

                        }
                    }
                },
            },
            security: [
                {
                    token: []
                }
            ],
        },
        delete: {
            tags: ['item'],
            summary: 'Delete an item',
            description: 'Delete an item',
            operationId: 'deleteItems',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of an item that needs to be deleted',
                    required: true,
                    schema : {
                        type: 'integer',
                        format: 'int64'
                    }
                }
            ],
            responses: {
                200: {
                    content: {
                        'application/json': {
                            example: {
                                status: 200,
                                message: 'Deleting item successfully',
                            }

                        }
                    }
                },
                401: {
                    content: {
                        'application/json': {
                            example: {
                                status: 401,
                                message: 'Unauthorized',
                            }

                        }
                    }
                },
            },
            security: [
                {
                    token: []
                }
            ],
        },
    }
}
