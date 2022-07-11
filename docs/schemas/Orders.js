module.exports = {
    //make schema for orders
    Orders: {
        type: 'object',
        required: [
            'id',
            'customer_id',
            'item_id',
            'qty',
            'status',
            'payment_method'
        ],
        properties: {
            customer_id: {
                type: 'integer',
                format: 'int64',
            },
            item_id: {
                type: 'integer',
                format: 'int64',
            },
            qty: {
                type: 'integer',
                format: 'int64',
            },
            amount: {
                type: 'integer',
            },
            status: {
                type: 'string',
                enum: ['pending', 'processing', 'completed', 'cancelled']
            },
            payment_method: {
                type: 'string',
                enum: ['cash', 'credit card', 'debit card', 'paypal']
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    }
}