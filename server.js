const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/route");
const errorHandler = require("./errorHandler/errorHandler");

require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", taskRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));