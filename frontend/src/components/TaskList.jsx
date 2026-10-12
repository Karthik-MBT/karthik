import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete, busy }) {
  if (!tasks.length) return <div className="empty-state"><span className="empty-icon">✦</span><h3>All clear for now</h3><p>Add a task above and make today count.</p></div>;
  return <ul className="task-list">{tasks.map((task) => <TaskItem key={task._id} task={task} onToggle={onToggle} onDelete={onDelete} busy={busy} />)}</ul>;
}
