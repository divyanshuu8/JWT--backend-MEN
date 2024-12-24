const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiroutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
