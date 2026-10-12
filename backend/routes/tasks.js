const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();
const validId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks — return all tasks, newest first.
router.get("/", async (_req, res) => {
  try { res.json(await Task.find().sort({ createdAt: -1 })); }
  catch (error) { res.status(500).json({ message: "Could not fetch tasks." }); }
});

// POST /api/tasks — validate and create a task.
router.post("/", async (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  if (!title) return res.status(400).json({ message: "Title is required." });
  try { const task = await Task.create({ title }); return res.status(201).json(task); }
  catch (error) { return res.status(500).json({ message: "Could not create task." }); }
});

// PUT /api/tasks/:id — update title and/or completion state.
router.put("/:id", async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Task not found." });
  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body ?? {}, "title")) {
    const title = String(req.body.title ?? "").trim();
    if (!title) return res.status(400).json({ message: "Title cannot be empty." });
    updates.title = title;
  }
  if (Object.prototype.hasOwnProperty.call(req.body ?? {}, "completed")) {
    if (typeof req.body.completed !== "boolean") return res.status(400).json({ message: "completed must be a boolean." });
    updates.completed = req.body.completed;
  }
  if (!Object.keys(updates).length) return res.status(400).json({ message: "No valid fields supplied." });
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: "Task not found." });
    return res.json(task);
  } catch (error) { return res.status(500).json({ message: "Could not update task." }); }
});

// DELETE /api/tasks/:id — remove a task.
router.delete("/:id", async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Task not found." });
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found." });
    return res.json({ message: "Task deleted.", id: task._id });
  } catch (error) { return res.status(500).json({ message: "Could not delete task." }); }
});

module.exports = router;
