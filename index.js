const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database/connection/mongoDb");
const registerUser = require("./services/register");
const userDetails = require("./services/user");
const addTodoLimiter = require("././infrastructures/data/rateLimit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:2395",
  "http://localhost:8275",
  "http://localhost:6290",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

connectDB();

registerUser(app);
userDetails(app);
app.use("/user", addTodoLimiter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
