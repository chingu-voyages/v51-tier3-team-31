import { z } from "zod";
import {
  extendZodWithOpenApi,
  ZodOpenApiOperationObject,
  createDocument,
} from "zod-openapi";

extendZodWithOpenApi(z);

const userIdSchema = z
  .number()
  .min(1)
  .openapi({
    ref: "UserId",
    description: "The unique identifier of the User.",
    example: 1,
    param: {
      in: "path",
      name: "id",
    },
  });

export const userSchema = z
  .object({
    id: userIdSchema,
    googleId: z.string().openapi({
      description: "The Google Id of the User",
      example: "some google Id",
    }),
    name: z.string().openapi({
      description: "The User Name",
      example: "John Doe",
    }),
    email: z.string().email().openapi({
      description: "The User Email",
      example: "john.doe@test.com",
    }),
  })
  .openapi({
    ref: "User",
    description: "A User that can use the app.",
  });

export const userCreateSchema = userSchema.omit({ id: true }).openapi({
  ref: "UserCreate",
  description: "A User to create.",
});

export const createUser: ZodOpenApiOperationObject = {
  operationId: "createUser",
  summary: "Create a new User",
  description: "Creates a new User in the database.",
  requestBody: {
    description: "The User to create.",
    content: {
      "application/json": {
        schema: userCreateSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "The User was created successfully.",
      content: {
        "application/json": {
          schema: userSchema,
        },
      },
    },
  },
};

export const getUser: ZodOpenApiOperationObject = {
  operationId: "getUser",
  summary: "Get a User",
  description: "Gets a User from the database.",
  requestParams: {
    path: z.object({ id: userIdSchema }),
  },
  responses: {
    "200": {
      description: "The User was retrieved successfully.",
      content: {
        "application/json": {
          schema: userSchema,
        },
      },
    },

    "404": {
      description: "User with this id can not be found.",
    },
  },
};
