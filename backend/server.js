import express from "express";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middleware/errorHandlres";
import routes from "./routes";
import mongoose from "mongoose";

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
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);
app.listen(APP_PORT, () =>
  console.log(`Server is running on port ${APP_PORT}`)
);
