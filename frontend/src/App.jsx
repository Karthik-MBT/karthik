import { useCallback, useEffect, useMemo, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
    return data;
  }, []);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try { setTasks(await request("/tasks")); setError(""); }
    catch (e) { setError(`${e.message} Check that the backend and MongoDB are running.`); }
    finally { setLoading(false); }
  }, [request]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  async function addTask(title) {
    setBusy(true); setError("");
    try { const task = await request("/tasks", { method: "POST", body: JSON.stringify({ title }) }); setTasks((old) => [task, ...old]); return true; }
    catch (e) { setError(e.message); return false; }
    finally { setBusy(false); }
  }

  async function toggleTask(task) {
    setBusy(true); setError("");
    try { const updated = await request(`/tasks/${task._id}`, { method: "PUT", body: JSON.stringify({ completed: !task.completed }) }); setTasks((old) => old.map((item) => item._id === updated._id ? updated : item)); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function deleteTask(id) {
    setBusy(true); setError("");
    try { await request(`/tasks/${id}`, { method: "DELETE" }); setTasks((old) => old.filter((task) => task._id !== id)); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  }

  const completed = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const remaining = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <main className="page-shell">
      <header className="topbar"><a className="brand" href="/" aria-label="Taskflow home"><span className="brand-mark">✓</span> taskflow</a><span className="top-note"><span className="status-dot" /> Your day, in focus</span></header>
      <section className="hero"><p className="eyebrow">YOUR PERSONAL WORKSPACE</p><h1>Make room for<br /><span>what matters.</span></h1><p className="hero-copy">Small steps add up. Capture your tasks, find your rhythm, and get things done.</p></section>
      <section className="workspace" aria-label="To-do list">
        <div className="list-heading"><div><p className="section-kicker">THE DAILY LIST</p><h2>My tasks <span className="count-pill">{remaining}</span></h2></div><span className="date-label">{new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span></div>
        <TaskForm onAdd={addTask} busy={busy} />
        {error && <div className="error-message" role="alert"><span>{error}</span><button type="button" onClick={loadTasks}>Retry</button></div>}
        <div className="progress-row"><span>{completed} of {tasks.length} completed</span><span>{progress}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        {loading ? <div className="loading-state"><span className="spinner" /> Loading your tasks…</div> : <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} busy={busy} />}
        <footer className="list-footer"><span><span className="footer-spark">✦</span> One thing at a time.</span><span>Powered by MERN</span></footer>
      </section>
      <p className="page-footnote">A little progress each day adds up to big results.</p>
    </main>
  );
}
