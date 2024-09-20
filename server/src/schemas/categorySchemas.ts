import { z } from "zod";
import {
  extendZodWithOpenApi,
  ZodOpenApiOperationObject,
  createDocument,
} from "zod-openapi";

extendZodWithOpenApi(z);

const categoryIdSchema = z
  .number()
  .min(1)
  .openapi({
    ref: "CategoryId",
    description: "The unique identifier of the Category.",
    example: 1,
    param: {
      in: "path",
      name: "id",
    },
  });

export const categorySchema = z
  .object({
    id: categoryIdSchema,
    name: z.string().openapi({
      description: "The Category Name",
      example: "John Doe",
    }),
  })
  .openapi({
    ref: "Category",
    description: "An Expense Category.",
  });

export const categoryCreateSchema = categorySchema.omit({ id: true }).openapi({
  ref: "CategoryCreate",
  description: "A Category to create.",
});

export const createCategory: ZodOpenApiOperationObject = {
  operationId: "createCategory",
  summary: "Create a new Category",
  description: "Creates a new Category in the database.",
  requestBody: {
    description: "The Category to create.",
    content: {
      "application/json": {
        schema: categoryCreateSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "The Category was created successfully.",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
  },
};

export const getCategory: ZodOpenApiOperationObject = {
  operationId: "getCategory",
  summary: "Get a Category",
  description: "Gets a Category from the database.",
  requestParams: {
    path: z.object({ id: categoryIdSchema }),
  },
  responses: {
    "200": {
      description: "The Category was retrieved successfully.",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
    "404": {
      description: "Category with this id can not be found.",
    },
  },
};
