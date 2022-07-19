
module.exports = {

    '/api/order/addOrders': {
        post: {
            tags: ['order'],
            requestBody: {
                required: true,
                content: {
                    'application/x-www-form-urlencoded': {
                        schema: {
                            type: 'object',
                            properties: {
                                customer_id: {
                                    type: 'UUID',
                                    
                                },
                                item_id: {
                                    type: 'UUID',
                                },
                                qty: {
                                    type: 'number',
                                },
                                amount: {
                                    type: 'number',
                                    autoIncrement: (qty) => {
                                        return item_id.dataValues.price * qty;
                                        },
                                },
                                status: {
                                    type: 'string',
                                }

                            },
                            required: ['customer_id', 'item_id', 'qty', 'amount', 'status'],
                        },
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '200 || success',
                                message: 'Order added successfully',
                                
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                status: '401 || error',
                                message: 'Unauthorized access to add order data',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                message: 'Internal Server Error while adding order data',
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

    '/api/order/orders': {
        get: {
            tags: ['order'],
            summary: 'Get all orders',
            description: 'Get all orders',
            operationId: 'getOrders',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Orders'
                            }  
                        }
                    }
                },
                400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            example: {
                                status: '400 || error',
                                msg: 'Bad Request while getting order data',
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                status: '401 || error',
                                msg: 'Unauthorized access to get order data',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                msg: 'Internal Server Error while getting order data',
                            }
                        }
                    }
                }
            },
            security: [
                
            ]
        }
    },

    '/api/order/orders/{id}': {
        get: {
            tags: ['order'],
            summary: 'Get order by id',
            description: 'Get order by id',
            operationId: 'getOrderById',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be fetched',
                    required: true,
                    schema : {
                        type: 'uuid',
                        format: 'uuid',
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Orders'
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid ID supplied',
                    content: {
                        'application/json': {
                            example: {
                                status: '400 || error',
                                msg: 'Invalid ID supplied',
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                status: '401 || error',
                                msg: 'Unauthorized access to get order data',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                msg: 'Internal Server Error while getting order data',
                            }
                        }
                    }
                }
            },
            security: [
                
            ]  
        },

        put: {
            tags: ['order'],
            summary: 'Update order by id',
            description: 'Update order by id',
            operationId: 'updateOrder',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be updated',
                    required: true,
                    schema : {
                        type: 'uuid',
                        format: 'uuid',
                    }
                }

            ],
            requestBody: {
                description: 'Order object that needs to be updated',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Orders'
                        }
                    }
                }
            },
            responses: {
                203: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '203 || success',
                                msg: 'Order updated successfully',
                            }
                        }
                    }
                },
                400: {
                    description: 'Invalid ID supplied',
                    content: {
                        'application/json': {
                            example: {
                                status: '400 || error',
                                msg: 'Invalid ID supplied',
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized',
                    content: {
                        'application/json': {
                            example: {
                                status: '401 || error',
                                msg: 'Unauthorized access to update order data',
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                msg: 'Internal Server Error while updating order data',
                            }
                        }
                    }
                }
            },
            security: [
                
            ]
        },

        delete: {
            tags: ['order'],
            summary: 'Delete order by id',
            description: 'Delete order by id',
            operationId: 'deleteOrder',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Order id',
                    required: true,
                    schema: {
                        type: 'uuid',
                        format: 'uuid'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                status: '200 || success',
                                msg: 'Order deleted successfully',
                            }
                        }
                    }
                },
                403: {
                    description: 'Forbidden',
                    content: {
                        'application/json': {
                            example: {
                                status: '403 || error',
                                msg: 'Forbidden access to delete order data'
                            }
                        }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            example: {
                                status: '500 || error',
                                msg: 'Internal Server Error while deleting order data',
                            }
                        }
                    }
                }
            },
            security: [
                
            ]
        }
    },
}
// Compare this snippet from docs\schemas\Customers.js:


            
