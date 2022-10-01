const express = require("express");

const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, () => {
  console.log("Server is running.");
  mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB.");
  });
});
