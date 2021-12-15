import express from "express";
import { APP_PORT, DB_URL } from "./backend/config";
import errorHandler from "./backend/middleware/errorHandlres";
import routes from "./backend/routes";
import mongoose from "mongoose";
import path from "path";

// mongoose connection

const MongoDBconnection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
MongoDBconnection();
// mongoose.connect(DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // usefindAndModify: false,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

const app = express();
global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);
app.listen(APP_PORT, () =>
  console.log(`Server is running on port ${APP_PORT}`)
);
