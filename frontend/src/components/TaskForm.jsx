import { useState } from "react";

export default function TaskForm({ onAdd, busy }) {
  const [title, setTitle] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const saved = await onAdd(cleanTitle);
    if (saved) setTitle("");
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-title">New task</label>
      <input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to get done?" maxLength={200} required />
      <button className="add-button" type="submit" disabled={busy || !title.trim()}>+ Add task</button>
    </form>
  );
}
