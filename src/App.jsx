import { useState } from "react";

function App() {
  const [openSection, setOpenSection] = useState({
    openTaskForm: true,
    openTaskList: true,
    openCompletedTaskList: true,
  });
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("date"); // значения для сортировки сортировки по дате (значение "date") или приоритету (значение "priority")
  const [sortOrder, setSortOrder] = useState("asc"); // значения для сортировки по возростанию (значение "asc") или убыванию (значение "desc")
  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTask = sortTask(tasks.filter((task) => task.completed));

  function openedSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

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

  function sortTask(filteredTasks) {
    return filteredTasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder == "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
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
                <button
                  className={`sort-button ${sortType === "date" ? "active" : ""}`}
                  onClick={() => toggleSortOrder("date")}
                >
                  По дате {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
                </button>
                <button
                  className={`sort-button ${sortType === "priority" ? "active" : ""}`}
                  onClick={() => toggleSortOrder("priority")}
                >
                  По приоритету {sortType === "priority" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
                </button>
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
      <label>
        Название задачи
      <input
        type="text"
        value={formElement.title}
        placeholder="Почитать книжку"
        required
        onChange={(e) =>
          setFormElement({ ...formElement, title: e.target.value })
        }
      />
      </label>
      <label>
        Приоритет
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
      </label>

      <label>
        {" "}
        Дедлайн{" "}
        <input
          type="datetime-local"
          required
          value={formElement.deadline}
          onChange={(e) =>
            setFormElement({ ...formElement, deadline: e.target.value })
          }
        />
      </label>

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
          <sup>{priority}</sup>
        </h3>
        <div className="task-deadline">
          Дедлайн: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        <button className="complete-button" onClick={() => completeTask(id)} title={!task.completed ? "Отметить как выполненная задача" : "Вернуть в список активных задач"}>
          {task.completed ? "\u21BA" : "\u2714"}
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
