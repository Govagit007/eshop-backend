const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/error");

const app = express();

dotenv.config();
connectDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());

//----routes

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`API is Running On http://localhost:${PORT} `));
