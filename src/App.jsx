import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), label: input, done: false },
    ]);
    setInput("");
  };

  const handleInput = (e) => setInput(e.target.value);

  const handleInputKey = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, done: !task.done } : task
    ));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const removeDone = () => {
    setTasks(tasks.filter(task => !task.done));
  };

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Список завдань</h1>
      <div className="App">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            onKeyDown={handleInputKey}
            placeholder="Додати нове завдання..."
          />
          <button onClick={addTask}>Додати</button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.done ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.label}</span>
              <button onClick={() => removeTask(task.id)} title="Видалити">🗑️</button>
            </li>
          ))}
        </ul>
        {tasks.some(task => task.done) && (
          <button onClick={removeDone} className="delete-completed-btn">
            Видалити виконані
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
