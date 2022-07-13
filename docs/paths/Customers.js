module.exports = {
    '/Customer': {
        post: {
          tags: [
            "customer"
          ],
          summary: "Create customer",
          description: "This can only be done by logged in.",
          operationId: "addCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Created object",
              required: true,
              schema: {
                $ref: "#/definitions/Customer"
              }
            }
          ],
          responses: {
            default: {
              description: "successful operation"
            }
          }
        }
      },
        get: {
<<<<<<< HEAD
          tags: [
            "customer"
          ],
=======
          tags: ["customer"],
>>>>>>> e3e2d93ea753b7d941eb71d76696f91fa0700d74
          summary: "Find all customer",
          description: "This can only be done by the logged in customer.",
          operationId: "getAllcustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "name that need to be get customer",
              required: true,
              type: "string"
            },
            {
              in: "body",
              name: "body",
              description: "Get customer object",
              required: true,
              schema: {
                $ref: "#/definitions/Customer"
              }
            }
          ],
          responses: {
            400: {
              description: "Invalid Customer supplied"
            },
            404: {
              description: "Customer not found"
            }
          }
        },
        put: {
          tags: ["customer"],
          summary: "Updated customer",
          description: "This can only be done by the logged in customer.",
          operationId: "updateCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "name that need to be updated",
              required: true,
              type: "string"
            },
            {
              in: "body",
              name: "body",
              description: "Updated customer object",
              required: true,
              schema: {
                $ref: "#/definitions/Customer"
              }
            }
          ],
          responses: {
            400: {
              description: "Invalid Customer supplied"
            },
            404: {
              description: "Customer not found"
            }
          }
        },
        delete: {
          tags: [
            "customer"
          ],
          summary: "Delete Customer",
          description: "This can only be done by the logged in customer.",
          operationId: "deleteCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "The customer name that needs to be deleted",
              required: true,
              type: "string"
            }
          ],
          responses: {
            400: {
              description: "Invalid customername supplied"
            },
            404: {
              description: "Customer not found"
            }
          }
        }
      }
