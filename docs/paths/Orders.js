
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
                                status: {
                                    type: 'string',
                                },
                                payment_method: {
                                    type: 'string'
                                }

                            },
                            required: ['customer_id', 'item_id', 'qty', 'status', 'payment_method'],
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
                                $ref: '#/components/schemas/Orders'
                            }
                        }
                    }
                },
                200: {
                    description: 'success',
                    content: {
                        'application/json': {
                            example: {
                                $ref: '#/components/schemas/Orders'
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
                                msg: 'Unauthorized access to get order data',
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
                                "message": "Cannot find Order with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd."
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
            operationId: 'updateOrderById',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID of order that needs to be updated',
                    required: false,
                    schema : {
                        type: 'uuid',
                    }
                }
            ],
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
                                status: {
                                    type: 'string',
                                },
                                payment_method: {
                                    type: 'string'
                                }
                            },
                            required: ['customer_id', 'item_id', 'qty', 'status', 'payment_method'],
                            
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
                                status: '203',
                                msg: 'Order updated successfully',
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
                                message: "Cannot find Order with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd."
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
                                status: '500',
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
                                msg: 'Order deleted successfully',
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
                                msg: 'Cannot find Order with id 6f0c8067-c045-4c3c-b10f-fe8e12fb52cd.'
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


            
