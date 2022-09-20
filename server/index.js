const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

app.use(express.json());
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
