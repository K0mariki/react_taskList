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

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTask = tasks.filter((task) => task.completed);

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
              <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                activeTasks={activeTasks}
                completeTask={completeTask}
              />
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
            <CompletedTaskList
              tasks={tasks}
              deleteTask={deleteTask}
              completedTask={completedTask}
              completeTask={completeTask}
            />
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

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  );
}

function CompletedTaskList({ completedTask, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {completedTask.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id } = task;

  return (
    <li className={`task-item ${priority}`}>
      <div className="task-info">
        <h3>
          {title}
          <strong> {priority}</strong>
        </h3>
        <div className="task-deadline">
          Дедлайн: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        <button className="complete-button" onClick={() => completeTask(id)}>
          {task.completed ? "↺" : "✔"}
        </button>
        <button className="delete-button" onClick={() => deleteTask(id)}>
          &#10006;
        </button>
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
