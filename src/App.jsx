import { useState } from "react";

function App() {
  const [openSection, setOpenSection] = useState({
    openTaskForm: true,
    openTaskList: true,
    openCompletedTaskList: true,
  });

  function openedSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks([
      ...tasks,
      { ...task, completed: false, id: crypto.randomUUID() },
    ]);
  }

  return (
    <div className="app">
      <section>
        <div className="container">
          <h1>Создание задачи</h1>
          <button
            className={`close-button ${
              openSection.openTaskForm ? "open" : null
            }`}
            onClick={() => openedSection("openTaskForm")}
          >
            +
          </button>
          {openSection.openTaskForm && <TaskForm addTask={addTask} />}
        </div>
      </section>
      <section>
        <div className="container">
          <button
            className={`close-button ${
              openSection.openTaskList ? "open" : null
            }`}
            onClick={() => openedSection("openTaskList")}
          >
            +
          </button>
          <h2>Задачи</h2>
          {openSection.openTaskList && (
            <>
              <div className="sort-controls">
                <button className="sort-button">По дате</button>
                <button className="sort-button">По приоритету</button>
              </div>
              <TaskList tasks={tasks} />
            </>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <button
            className={`close-button ${
              openSection.openCompletedTaskList ? "open" : null
            }`}
            onClick={() => openedSection("openCompletedTaskList")}
          >
            +
          </button>
          <h2>Завершённые задачи</h2>
          {openSection.openCompletedTaskList && (
            <CompletedTaskList tasks={tasks} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [formElement, setFormElement] = useState({
    title: "",
    priority: "low",
    deadline: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    addTask({ ...formElement });
    setFormElement({ title: "", priority: "low", deadline: "" });
  }

  return (
    <form className="task-form" action="" onSubmit={handleSubmit}>
      <input
        type="text"
        value={formElement.title}
        placeholder="Название задачи"
        required
        onChange={(e) =>
          setFormElement({ ...formElement, title: e.target.value })
        }
      />
      <select
        value={formElement.priority}
        onChange={(e) =>
          setFormElement({ ...formElement, priority: e.target.value })
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="datetime-local"
        required
        value={formElement.deadline}
        onChange={(e) =>
          setFormElement({ ...formElement, deadline: e.target.value })
        }
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
}

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks
        .filter((task) => !task.complete)
        .map((task) => (
          <TaskItem key={task.id} taskObj={task} />
        ))}
    </ul>
  );
}

function CompletedTaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks
        .filter((task) => task.complete)
        .map((task) => (
          <TaskItem key={task.id} taskObj={task} />
        ))}
    </ul>
  );
}

function TaskItem({ taskObj }) {
  const {title, priority, deadline, id} = taskObj
  
  return (
    <li className={`task-item ${priority}`}>
      <div className="task-info">
        <h3>{title}<strong> {priority}</strong></h3>
        <div className="task-deadline">Дедлайн: {new Date(deadline).toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">&#10004;</button>
        <button className="delete-button">&#10006;</button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Используемые технологии и react концепции: React, JSX, props, useState,
        copmonent, composition, conditional rendering, array methods (map,
        filter), event handling.
      </p>
    </footer>
  );
}

export default App;
