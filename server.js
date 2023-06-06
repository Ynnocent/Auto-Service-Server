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

// Server Extra Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5050', // Development Host. Make sure to make changes in the .env file
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.json());

// Server Logic
app.use("/user", authRoutes);
app.use("/customer", customerRoutes);
app.use("/employee", employeeRoutes);

// Server Listening in
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});