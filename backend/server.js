require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/tasks", taskRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error." });
});

async function start() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing. Create backend/.env from backend/.env.example.");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
}
start().catch((error) => { console.error("Startup failed:", error.message); process.exit(1); });
