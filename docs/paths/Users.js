module.exports = {
    "/user": {
        post: {
          tags: [
            "user"
          ],
          summary: "Create user",
          description: "This can only be done by logged in user.",
          operationId: "createUser",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "Created user object",
              required: true,
              schema: {
                $ref: "#/definitions/User"
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
      "/user/createWithArray": {
        post: {
          tags: [
            "user"
          ],
          summary: "Creates list of users with given input array",
          description: "",
          operationId: "createUsersWithArrayInput",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "List of user object",
              required: true,
              schema: {
                type: "array",
                items: {
                  $ref: "#/definitions/User"
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
      "/user/createWithList": {
        post: {
          tags: [
            "user"
          ],
          summary: "Creates list of customers with given input array",
          description: "",
          operationId: "createUsersWithListInput",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              in: "body",
              name: "body",
              description: "List of user object",
              required: true,
              schema: {
                type: "array",
                items: {
                  $ref: "#/definitions/User"
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
      "/user/login": {
        get: {
          tags: [
            "user"
          ],
          summary: "Logs User into the system",
          description: "",
          operationId: "loginUser",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              name: "username",
              in: "query",
              description: "The User name for login",
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
                type: "string"
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
              description: "Invalid username/password supplied"
            }
          }
        }
      },
      "/user/logout": {
        get: {
          tags: [
            "user"
          ],
          summary: "Logs out current logged in user session",
          description: "",
          operationId: "logoutUser",
          produces: [
            "application/xml",
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
      "/user/{username}": {
        get: {
          tags: [
            "user"
          ],
          summary: "Get user by user name",
          description: "",
          operationId: "getUserByName",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              name: "username",
              in: "path",
              description: "The name that needs to be fetched. Use user1 for testing. ",
              required: true,
              type: "string"
            }
          ],
          responses: {
            200: {
              description: "successful operation",
              schema: {
                $ref: "#/definitions/User"
              }
            },
            400: {
              description: "Invalid username supplied"
            },
            404: {
              description: "User not found"
            }
          }
        },
        put: {
          tags: [
            "user"
          ],
          summary: "Updated User",
          description: "This can only be done by the logged in user.",
          operationId: "updateUser",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              name: "username",
              in: "path",
              description: "name that need to be updated",
              required: true,
              type: "string"
            },
            {
              in: "body",
              name: "body",
              description: "Updated user object",
              required: true,
              schema: {
                $ref: "#/definitions/User"
              }
            }
          ],
          responses: {
            400: {
              description: "Invalid user supplied"
            },
            404: {
              description: "User not found"
            }
          }
        },
        delete: {
          tags: [
            "user"
          ],
          summary: "Delete User",
          description: "This can only be done by the logged in User.",
          operationId: "deleteUser",
          produces: [
            "application/xml",
            "application/json"
          ],
          parameters: [
            {
              name: "username",
              in: "path",
              description: "The name that needs to be deleted",
              required: true,
              type: "string"
            }
          ],
          responses: {
            400: {
              description: "Invalid username supplied"
            },
            404: {
              description: "User not found"
            }
          }
        }
      }
    }
