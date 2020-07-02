import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.NAME || 'Server',
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0'
  }
};
