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
