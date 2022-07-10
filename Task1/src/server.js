require("dotenv").config();
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import "regenerator-runtime/runtime";
import viewEngine from "./config/viewEngine";
import initRoutes from "./routes";

// Connect to MongoDB database
mongoose.connect(process.env.DB_URL);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Successfully connect MongoDB!");
});

let app = express();

// config view engine
viewEngine(app);

app.use(express.json());

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init all web routes
initRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
