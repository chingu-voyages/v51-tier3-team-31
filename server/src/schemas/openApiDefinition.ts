import { createDocument } from "zod-openapi";
import { categorySchema, categoryCreateSchema } from "./categorySchemas";
import { userSchema, userCreateSchema } from "./userSchemas";

// Import or copy the operation objects from both files
import { createCategory, getCategory } from "./categorySchemas";
import { createUser, getUser } from "./userSchemas";

export const openAPI_Definition = createDocument({
  openapi: "3.1.0",
  info: {
    title: "SplitIt API",
    description: "An API for Expense Splitter APP - SplitIt.",
    version: "1.0.0",
  },

  paths: {
    "/api/v1/categories": {
      post: createCategory,
    },
    "/api/v1/categories/{id}": {
      get: getCategory,
    },
    "/api/v1/users": {
      post: createUser,
    },
    "/api/v1/users/{id}": {
      get: getUser,
    },
  },

  components: {
    schemas: {
      Category: categorySchema,
      CategoryCreate: categoryCreateSchema,
      User: userSchema,
      UserCreate: userCreateSchema,
    },
  },
});
