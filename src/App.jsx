import { useState } from "react";

const dataTask = [
  {
    id: crypto.randomUUID(),
    title: "Изучение react",
    priority: "High",
    date: 1,
    complete: false
  },
  {
    id: crypto.randomUUID(),
    title: "Изучение react2",
    priority: "High",
    date: 1,
    complete: false
  },
    {
    id: crypto.randomUUID(),
    title: "Изучение react",
    priority: "High",
    date: 1,
    complete: false
  },
  {
    id: crypto.randomUUID(),
    title: "Изучение react2",
    priority: "High",
    date: 1,
    complete: false
  },
    {
    id: crypto.randomUUID(),
    title: "Изучение react",
    priority: "High",
    date: 1,
    complete: true
  },
  {
    id: crypto.randomUUID(),
    title: "Изучение react2",
    priority: "High",
    date: 1,
    complete: false
  },
];

function App() {
  const [openSection, setOpenSection] = useState({
    openTaskForm: false,
    openTaskList: true,
    openCompletedTaskList: true,
  });

  function openedSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
          {openSection.openTaskForm && <TaskForm />}
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
              <TaskList />
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
          {openSection.openCompletedTaskList && <CompletedTaskList />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function TaskForm() {
  return (
    <form action="" className="task-form">
      <input type="text" value={""} placeholder="Название задачи" required />
      <select value={""}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="datetime-local" value={""} required />
      <button type="submit">Добавить задачу</button>
    </form>
  );
}

function TaskList() {
  return (
    <ul className="task-list">
      {dataTask.filter((task) => !task.complete).map((task) => (
        <TaskItem key={task.id} obj={task} />
      ))}
    </ul>
  );
}

function CompletedTaskList() {
  return (
    <ul className="task-list">
      {dataTask.filter((task) => task.complete).map((task) => (
        <TaskItem key={task.id} obj={task} />
      ))}
    </ul>
  );
}

function TaskItem(props) {
  return (
    <li className="task-item">
      <div className="task-info">
        <h3>{props.obj.title}</h3>
        <div className="task-deadline">{new Date().toLocaleString()}</div>
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
