module.exports = {
    Customers: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64"
          },
          username: {
            type: "string"
          },
          firstName: {
            type: "string"
          },
          lastName: {
            type: "string"
          },
          email: {
            type: "string"
          },
          password: {
            type: "string"
          },
          phone: {
            type: "string"
          },
          userStatus: {
            type: "integer",
            format: "int32",
            description: "Customer Status"
          }
        },
        xml: {
          name: "Customer"
        }
    }
}
