import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { DataSource, DataSourceOptions } from 'typeorm';

const data: any = dotenv.parse(fs.readFileSync(`.env`));

export const config: DataSourceOptions = {
  type: 'postgres',
  host: data.POSTGRES_HOST,
  port: data.POSTGRES_PORT,
  username: data.POSTGRES_USERNAME,
  password: data.POSTGRES_PASSWORD,
  database: data.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['../migrations/*.js'],
};

export default new DataSource(config);
