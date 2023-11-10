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

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://meek-gaufre-5e445c.netlify.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use(express.json());
// app.use(cookieParser());

app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Origin",
    "https://meek-gaufre-5e445c.netlify.app"
  );

  res.header("Access-Control-Allow-Credentials", true);
  res.status(200).send();
});

//----routes

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/products", product);
app.use("/api/users", user);
app.use("/api/orders", order);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`API is Running On http://localhost:${PORT} `));
