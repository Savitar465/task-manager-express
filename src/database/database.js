import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

export const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres',
});
