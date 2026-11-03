const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const app = express();
const router = require("./api/routers/index");

const mongooseStart = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://myhome:lN2v9m3eR5tQ2n6J@myhomelist.mkgnqym.mongodb.net/", {
      dbName: process.env.MONGO_DB || "Myhomelist",
    });
  } catch (err) {
    // DB connection error is handled by the process if needed.
  }
};

mongooseStart();

try {
  const corsOrigin = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : true;

  app
    .use(morgan("dev"))
    .use(cors({ origin: corsOrigin, credentials: true }))
    .use(express.json({ limit: "1mb" }))
    .use("/api", router)
    .listen(3000, () => {
      // Server started.
    });
} catch (err) {
  // Server start error.
}
