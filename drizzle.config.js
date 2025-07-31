import { config } from './src/core/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/core/database/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.database.url,
  },
});