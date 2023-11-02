import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
}; 

const conexion = mysql.createConnection(dbConfig);

export default conexion;