const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.DEV_PORT; // Development Port. Make sure to make changes in the .env file

// Routes
const authRoutes = require("./routes/authRoute");
const customerRoutes = require("./routes/customerRoute");
const employeeRoutes = require("./routes/employeeRoute");
const adminRoutes = require("./routes/adminRoute");
const carRoutes = require("./routes/carRoute");
// Server Extra Config
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Development Host. Make sure to make changes in the .env file
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.json());

// Server Logic
app.use("/user", authRoutes);
app.use("/customer", customerRoutes);
app.use("/employee", employeeRoutes);
app.use("/admin", adminRoutes);
app.use("/car", carRoutes);
// Server Listening in
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
