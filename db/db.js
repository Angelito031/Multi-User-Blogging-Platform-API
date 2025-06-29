import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new pg.Client({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
});

try {
  await client.connect();
  console.log("Database is Connected");
} catch (error) {
  console.log(error);
}

export default client;
