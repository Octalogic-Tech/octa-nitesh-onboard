import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT, 10) || 5432,
  username: process.env.PGUSER || 'postgres',
  password: String(process.env.PGPASSWORD) || '1234',
  database: process.env.PGDATABASE || 'vehicle-management',
}));
