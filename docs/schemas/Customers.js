module.exports = {
    Customers: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64"
          },
          user_id: {
            type: "integer",
            format: "int64"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }

        },
    }
}
