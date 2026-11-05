require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow one or more frontend origins, separated by commas.
// Example: http://localhost:5173,https://your-frontend.onrender.com
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Requests from tools such as curl and server-to-server calls have no Origin.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS."));
  }
}));

app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/tasks", taskRoutes);

app.use((err, _req, res, _next) => {
  console.error("Request error:", err.message);
  if (err.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unexpected server error." });
});

async function start() {
  const mongoUri = process.env.MONGO_URI?.trim();

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Set it in backend/.env locally or in the Render backend Environment settings.");
  }

  if (!/^mongodb(\+srv)?:\/\//i.test(mongoUri)) {
    throw new Error("MONGO_URI must start with mongodb:// or mongodb+srv://. In Render, paste the complete MongoDB Atlas connection string.");
  }

  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected to MongoDB.");

  app.listen(PORT, () => {
    console.log(`Taskflow API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Startup failed:", error.message);
  process.exit(1);
});
