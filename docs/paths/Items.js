module.exports = {
    
    '/api/item/addItem': {
        post: {
            tags: ['item'],
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
                                },
                                photo: {
                                    type: 'string',
                                    format: 'binary'
                                },
                            },
                            required: [
                            'name', 
                            'price', 
                            'store_name', 
                            'category', 
                            'brand',
                            'photo'],
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
                    description: 'Item already exists',
                    content: {
                        'application/json': {
                            example: {
                                status: '400',
                                message: 'item already exists',
                                
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

    '/api/item/items': {
        get: {
            tags: ['item'],
            summary: 'Get all items',
            description: 'Get all items',
            operationId: 'getAll',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Items'
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
    '/api/item/items/{id}': {
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
                    required: false,
                    schema : {
                        type: 'uuid',
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Items'
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
                404: {
                    content: {
                        'application/json': {
                            example: {
                                status: 404,
                                message: "Item with id cannot be found.",
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
                    required: false,
                    schema : {
                        type: 'uuid',
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
                203: {
                    content: {
                        'application/json': {
                            example: {
                                message: "Updated Successfully"
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
            summary: 'Delete item by id',
            description: 'Delete item by id',
            operationId: 'delete item',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'item id',
                    required: false,
                    schema: {
                        type: 'uuid',
                    }
                }
            ],
            responses: {
                204: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '204',
                                msg: 'Deleted Successfully',
                            }
                        }
                    }
                },
                404: {
                    description: 'Not Found',
                    content: {
                        'application/json': {
                            example: {
                                status: '404',
                                msg: 'Cannot find item with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd.'
                            }
                        }
                    }
                },
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
