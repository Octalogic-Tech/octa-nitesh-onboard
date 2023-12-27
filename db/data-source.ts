// data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { Vehicle } from '../entities/vehicle.entity';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: String(process.env.PGPASSWORD),
  database: process.env.PGDATABASE,
  synchronize: false,
  logger: 'debug',
  entities: [Vehicle, Booking, User],
  migrations: ['dist/db/migrations/*.js'],
  ssl: { rejectUnauthorized: false },
  extra: {
    ssl: { rejectUnauthorized: false },
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
