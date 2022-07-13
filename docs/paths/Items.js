module.exports = {
    '/api/item/addItem': {
post: {
    tags: ['items'],
    summary: "Adding a new item",
    description: "Add a new item to the database",
    operationId: "addItem",
    consumes:[
        "application/json"
    ],
    produces:[
        "application/json"
    ],
    parameters: [
        {
            in: 'body',
            name: 'body',
            description: 'Item object that needs to be added',
            required: true,
            schema: {
                $ref: '#/components/schemas/Items'
            }
        }
        ],
    responses: {
        201: {
            description: 'Success',
            schema: {
                type: 'object',
                properties: {
                message: {type: 'string'}
                }
            }
        },
        400: {
            description: 'Name cannot be empty',
        },
        400: {
            description: 'Price cannot be empty',
        },
        500: {
            description: 'Internal server error',
        },
        security: [
        {
            binglestore_auth: [
                "write:items",
                "read:items" 
            ]
        }
    ]
    }}
},

 '/api/item/items' : {
get: {
    tags: ['items'],
    summary: "Showing all items",
    description: "Showing all registered items in database",
    operationId: "getAll",
    consumes:[
        "application/json"
    ],
    produces:[
        "application/json"
    ],
    parameters: [],
    responses: {
      "200":{
        description: "Getting all items successfuly",
        schema: {
            type: "array",
            item: {
                $ref: '#/components/schemas/Items'
        }
      },
      500: {
        description: 'Internal server error',
    },
      security: [
        {
            binglestore_auth: [
                "write:items",
                "read:items" 
            ]
        }
    ]
}}}
},

    '/api/order/items/{id}': {
get: {
    tags: ['items'],
    summary: "Find item by ID",
    description: "Showing a registered item by ID",
    operationId: "getByID",
    consumes:[
        "application/json"
    ],
    produces:[
        "application/json"
    ],
    parameters: [
        {
        name: "id",
        in: "path",
        description: "The ID of item that needs to be showed",
        required: true,
        schema : {
            type: 'integer',
            format: 'int64',
        }
        }
    ],
    responses: {
      200:{
        description: "Getting all items successfuly",
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Items'
                }
            }
        },
        404: {
            description: 'Item with ID cannot be found',
        },
        500: {
            description: 'Internal server error',
        },
      security: [
        {
            binglestore_auth: [
                "write:items",
                "read:items" 
            ]
        }
    ]
    }}
}},


put: {
    tags: ['items'],
    summary: 'Update an existing item',
    description: 'Update the category of existing item in the database',
    operationId: 'updateItem',
    consumes: ['application/json'],
    produces: ['application/json'],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of item that needs to be updated',
            required: true,
            schema : {
                type: 'integer',
                format: 'int64'
            }
        }


    ],
    requestBody: {
        description: 'Object of an item that needs to be updated',
        required: true,
        content: {
                schema: {
                    $ref: '#/components/schemas/Items'
                }
            }
        }
    ,
    responses: {
        203: {
            description: 'Updated successfully',
            schema: {
                type: 'object',
                properties: {
                message: {type: 'string'}
                }
            }
        },
        404: {
            description: 'There is something wrong',
        },
    },
    security: [
        {
            binglestore_auth: [
                'write:orders',
                'read:orders'
            ]
        }
    ]
},

delete: {
    tags: ['items'],
    summary: 'Delete item by ID',
    description: 'The selected item will be deleted',
    operationId: 'deleteItem',
    consumes: ['application/json'],
    produces: ['application/json'],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'ID of item that needs to be deleted',
            required: true,
            schema : {
                type: 'integer',
                format: 'int64'
            }
        }
    
    ],
    responses: {
        200: {
            description: 'Deleted successfully',
            schema: {
                type: 'object',
                properties: {
                message: {type: 'string'}
                }
            }
        },
        400 :{
            description: "There's something wrong",
            }
        },
    security: [
        {
            binglestore_auth: [
                'write:orders',
                'read:orders'
            ]
        }
    ]   
}
}
