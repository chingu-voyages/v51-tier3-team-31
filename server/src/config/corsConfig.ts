// server/src/config/corsConfig.ts

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  credentials: true,
  origin: [
    'http://localhost:5173',
    'http://localhost',
    'http://127.0.0.1:5173',
    'http://127.0.0.1',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
};

export default corsOptions;
