import React, { useState } from "react";
import "./App.css";
import deleteIcon from "./images/delete1.png";
import penIcon from "./images/pen.png";

const States = () => {
  const [ToDoList, setToDoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleChange = event => {
    setNewTask(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      return; // Ignore empty task
    }

    const capitalizedTask = newTask.charAt(0).toUpperCase() + newTask.slice(1);

    const task = {
      id: ToDoList.length === 0 ? 1 : ToDoList[ToDoList.length - 1].id + 1,
      taskName: capitalizedTask,
      completed: false,
    };

    const newToDoList = [...ToDoList, task];
    setToDoList(newToDoList);
    setNewTask(""); // Clear the input field after adding task
  };

  const deleteTask = taskId => {
    const newToDoList = ToDoList.filter(task => task.id !== taskId);
    setToDoList(newToDoList);
  };

  const markAsCompleted = taskId => {
    const updatedToDoList = ToDoList.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setToDoList(updatedToDoList);
  };

  const resetList = () => {
    setToDoList([]);
  };

  const pendingTasksCount = ToDoList.filter(task => !task.completed).length;

  return (
    <>
      <h1 className="app_titile">TODO APP
      <img src={penIcon} className="pen_icon" /></h1>

      <div className="App2">
        <div className="taskCount">
          <p>
            You have {pendingTasksCount}{" "}
            {pendingTasksCount === 1 ? "pending task" : "pending tasks"}
          </p>
        </div>
        <div className="addTask">
          <input
            placeholder="Enter Your Todo Here"
            id="input_btn"
            value={newTask}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <button className="btn" onClick={addTask}>
            +
          </button>
          <button className="reset-btn" onClick={resetList}>
            Clear
          </button>
        </div>

        <div className="list">
          {ToDoList.map(task => (
            <div
              className={`task_delete_btn ${task.completed ? "completed" : ""}`}
              key={task.id}
            >

              <div className="task_text_div">
              <p className="task_text">{task.taskName}</p>
              </div>

              <div className="del_btb_div">
              <button
                className="delete_btn"
                onClick={() => deleteTask(task.id)}
              >
                <img src={deleteIcon} className="delete_icon" />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default States;
