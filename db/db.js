import { Client } from "pg";

const client = new Client({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: process.env.DBHOST || "localhost",
  port: 5334,
  database: process.env.DBNAME,
});
