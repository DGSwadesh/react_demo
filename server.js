import express from "express";
import { APP_PORT, DB_URL } from "./backend/config";
import errorHandler from "./backend/middleware/errorHandlres";
import routes from "./backend/routes";
import mongoose from "mongoose";
import path from "path";
import { createPool } from "mysql";

const pool = createPool({
  host: "localhost",
  database: "node_test",
  user: "root",
  password: "",
  connectionLimit: 10,
});
pool.query("select * from users", (err, result, field) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
});


const app = express();
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);
app.listen(APP_PORT, () =>
  console.log(`Server is running on port ${APP_PORT}`)
);


