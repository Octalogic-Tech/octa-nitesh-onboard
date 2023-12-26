  // data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
  database: process.env.PGDATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  ssl: { rejectUnauthorized: false },
  extra: {
    ssl: { rejectUnauthorized: false },
  }
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;