module.exports = {
    "/api/user/register": {
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
                $ref: "#/components/schemas/Users"
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
      "/api/user/login": {
        post: {
        tags: [
          "user"
        ],
        summary: "User Login",
        description: "This can only be done by logged in user.",
        operationId: "login",
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
              $ref: "#/components/schemas/Users"
            }
          }
        ],
        responses: {
          default: {
            description: "successful operation"
          }
        }
      },
     
        get: {
          tags: ["user"],
          summary: "Find all User",
          description: "This can only be done by the logged in User.",
          operationId: "getAll",
          produces: [
            "application/json"
          ],
          parameters: [
            {
              name: "username",
              in: "path",
              description: "name that need to be get User",
              required: true,
              type: "string"
            },
            {
              in: "body",
              name: "body",
              description: "Get User object",
              required: true,
              schema: {
                $ref: "#/components/schemas/Users"
              }
            }
          ],
          responses: {
            400: {
              description: "Invalid User supplied"
            },
            404: {
              description: "User not found"
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
              $ref: "#/components/schemas/Users"
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
    },
  }
