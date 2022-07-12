module.exports = {
    "/Customer": {
        post: {
          tags: [
            "customer"
          ],
          summary: "Create customer",
          description: "This can only be done by logged in.",
          operationId: "createCustomer",
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
      "/customer/createWithArray": {
        post: {
          tags: [
            "customer"
          ],
          summary: "Creates list of customers with given input array",
          description: "",
          operationId: "createCustomersWithArrayInput",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "List of customer object",
              required: true,
              schema: {
                type: "array",
                items: {
                  $ref: "#/definitions/Customer"
                }
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
      "/customer/createWithList": {
        post: {
          tags: [
            "customer"
          ],
          summary: "Creates list of Customers with given input array",
          description: "",
          operationId: "createCustomersWithListInput",
          produces: [
           
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "List of Customer object",
              required: true,
              schema: {
                type: "array",
                items: {
                  $ref: "#/definitions/Customer"
                }
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
      "/customer/login": {
        get: {
          tags: [
            "customer"
          ],
          summary: "Logs Customer into the system",
          description: "",
          operationId: "loginCustomer",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "query",
              description: "The customer name for login",
              required: true,
              type: "string"
            },
            {
              name: "password",
              in: "query",
              description: "The password for login in clear text",
              required: true,
              type: "string"
            }
          ],
          responses: {
            200: {
              description: "successful operation",
              schema: {
                "type": "string"
              },
              headers: {
                "X-Rate-Limit": {
                  type: "integer",
                  format: "int32",
                  description: "calls per hour allowed by the user"
                },
                "X-Expires-After": {
                  type: "string",
                  format: "date-time",
                  description: "date in UTC when token expires"
                }
              }
            },
            400: {
              description: "Invalid Customername/password supplied"
            }
          }
        }
      },
      "/customer/logout": {
        get: {
          tags: [
            "customer"
          ],
          summary: "Logs out current logged in Customer session",
          description: "",
          operationId: "logoutCustomer",
          produces: [
            "application/json"
          ],
          parameters: [],
          responses: {
            default: {
              description: "successful operation"
            }
          }
        }
      },
      "/customer/{customername}": {
        get: {
          tags: [
            "customer"
          ],
          summary: "Get customer by Customer name",
          description: "",
          operationId: "getCustomerByName",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "customername",
              in: "path",
              description: "The name that needs to be fetched. Use customer1 for testing. ",
              required: true,
              type: "string"
            }
          ],
          responses: {
            200: {
              description: "successful operation",
              schema: {
                $ref: "#/definitions/Customer"
              }
            },
            400: {
              description: "Invalid username supplied"
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
          produces: ["application/json"],
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
          tags: ["customer"],
          summary: "Delete Customer",
          description: "This can only be done by the logged in customer.",
          operationId: "deleteCustomer",
          produces: ["application/json"],
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
}
