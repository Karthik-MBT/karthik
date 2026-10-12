export default function TaskItem({ task, onToggle, onDelete, busy }) {
  return (
    <li className={`task-item ${task.completed ? "is-complete" : ""}`}>
      <label className="task-check">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} disabled={busy} aria-label={`Mark ${task.title} ${task.completed ? "incomplete" : "complete"}`} />
        <span className="custom-check" aria-hidden="true">{task.completed ? "✓" : ""}</span>
      </label>
      <span className="task-title">{task.title}</span>
      <button className="delete-button" type="button" onClick={() => onDelete(task._id)} disabled={busy} aria-label={`Delete ${task.title}`} title="Delete task">×</button>
    </li>
  );
}
