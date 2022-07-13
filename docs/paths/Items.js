module.exports = {
    '/items': {
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
            in: "body",
            name: "name",
            description: "Name of new item",
            required: true,
            schema: {
            type: "string"
            }
        },
        {
            in: "body",
            name: "price",
            description: "Price of new item",
            required: true,
            schema: {
            type: "integer"
            }
        },
        {
            in: "body",
            name: "store_name",
            description: "Store name of the item",
            required: true,
            schema: {
            type: "string",
            }
        },
        {
            in: "body",
            name: "category",
            description: "Category of the item",
            required: true,
            schema: {
            type: "string",
            }
        },
        {
            in: "body",
            name: "brand",
            description: "Brand of the item",
            required: true,
            schema: {
            type: "string",
            }
        },
        ],
    responses: {
        "201":{
        description: "Item added successfully",
        },
        "400":{
            description: "Name cannot be empty",
            },
        "400":{
            description: "Price cannot be empty",
            },
        "500":{
        description: "Internal server error",
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
{
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
      "500":{
        description: "Internal server error",
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
{
    '/items/{id}': {
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
      "200":{
        description: "Getting all items successfuly",
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Items'
                }
            }
        },
      "404":{
        description: "Item with ID cannot be found",
      "500":{
        description: "Error retrieving item with ID",
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
}}}
},
{
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
    },
    responses: {
        "203":{
            description: "Updated Successfully",
          "404":{
            description: "There's something wrong",
            }
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
},
{
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
            "200":{
            description: "Deleted successfully",
            "400":{
            description: "There's something wrong",
            }
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
