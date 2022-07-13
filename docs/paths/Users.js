module.exports = {
    "/user": {
        post: {
          tags: [
            "user"
          ],
          summary: "Create user",
          description: "This can only be done by logged in user.",
          operationId: "register",
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
        post: {
        tags: [
          "user"
        ],
        summary: "Create user",
        description: "This can only be done by logged in user.",
        operationId: "register",
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
      },
      put: {
        tags: ["user"],
        summary: "Updated Password",
        description: "This can only be done by the logged in user.",
        operationId: "updatePassword",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "Password",
            in: "path",
            description: "name that need to be updated",
            required: true,
            type: "string"
          },
          {
            in: "body",
            name: "body",
            description: "Updated user password",
            required: true,
            schema: {
              $ref: "#/definitions/Customer"
            }
          }
        ],
        responses: {
          400: {
            description: "Invalid password supplied"
          },
          404: {
            description: "User password not found"
          }
        }
      }
    }
