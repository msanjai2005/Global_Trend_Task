import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaSyncAlt,
  FaUser,
  FaListAlt,
  FaCheckCircle,
  FaCircle,
  FaClipboardList,
} from "react-icons/fa";
import "../styles/Tasks.css";

const DEFAULT_STATUS = "Pending";

const Tasks = () => {
  const { logout, user } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: DEFAULT_STATUS,
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= FETCH ================= */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("task/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setForm({ title: "", description: "", status: DEFAULT_STATUS });
    setEditId(null);
    setShowForm(false);
  };

  const showMessage = (msg, type = "success") => {
    type === "success" ? setSuccess(msg) : setError(msg);
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return showMessage("Title required", "error");

    try {
      setLoading(true);

      editId
        ? await API.put(`task/tasks/${editId}`, form)
        : await API.post("task/tasks", form);

      showMessage(editId ? "Task updated" : "Task created");
      resetForm();
      fetchTasks();
    } catch {
      showMessage("Failed to save task", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TASK ACTIONS ================= */
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status || DEFAULT_STATUS,
    });
    setEditId(task._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await API.delete(`task/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    showMessage("Task deleted");
  };

  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "Completed" ? DEFAULT_STATUS : "Completed";

    await API.put(`task/tasks/${task._id}`, { status: newStatus });

    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, status: newStatus } : t
      )
    );
  };

  /* ================= UI ================= */
  const completedCount = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  return (
    <div className="tasks-container">
      {/* HEADER */}
      <header className="tasks-header">
        <div className="header-content">
          <div className="header-left">
            <FaClipboardList className="header-icon" />
            <h1>Task Manager</h1>
          </div>
          <div className="user-info">
            <span>
              <FaUser /> {user?.email}
            </span>
            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="tasks-main">
        {/* STATS */}
        <div className="tasks-top-bar">
          <div className="tasks-stats">
            <div className="stats-card">
              <h3>Total</h3>
              <div className="count">{tasks.length}</div>
            </div>
            <div className="stats-card completed">
              <h3>Completed</h3>
              <div className="count">{completedCount}</div>
            </div>
          </div>

          {!showForm && (
            <button className="create-btn" onClick={() => setShowForm(true)}>
              <FaPlus /> New Task
            </button>
          )}
        </div>

        {/* FORM */}
        {showForm && (
          <section className="task-form-section show">
            <div className="form-container">
              <div className="form-header">
                <h2>
                  {editId ? <FaEdit /> : <FaPlus />}{" "}
                  {editId ? "Edit Task" : "Create Task"}
                </h2>
                <button onClick={resetForm} className="close-form-btn">
                  <FaTimes />
                </button>
              </div>

              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit} className="task-form">
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />

                <textarea
                  placeholder="Description"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />

                <div className="status-toggle">
                  {["Pending", "Completed"].map((s) => (
                    <button
                      type="button"
                      key={s}
                      className={`status-btn ${
                        form.status === s ? "active" : ""
                      }`}
                      onClick={() => setForm({ ...form, status: s })}
                    >
                      {s === "Completed" ? <FaCheckCircle /> : <FaCircle />}
                      {s}
                    </button>
                  ))}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="submit">
                    {editId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* TASKS */}
        <section className="tasks-grid">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`task-card ${
                task.status === "Completed" ? "completed" : ""
              }`}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                  <button onClick={() => toggleStatus(task)}>
                    {task.status === "Completed" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaCircle />
                    )}
                  </button>
                  <button onClick={() => handleEdit(task)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(task._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>

              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-footer">
                <span>
                  <FaCalendarAlt />{" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <span className="status-badge">{task.status}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Tasks;
