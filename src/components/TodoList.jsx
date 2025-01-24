import { useEffect, useState } from "react";
import Task from "./Task";

function TodoList() {
  const emptyTask = { text: "", status: "" };
  const [currentTask, setCurrentTask] = useState(emptyTask);
  const [list, setList] = useState(localStorage["list"] ? JSON.parse(localStorage["list"]) : []);
  const [type, setType] = useState("All");
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  let activeList = [];

  useEffect(() => {
    if (list) {
      localStorage["list"] = JSON.stringify(list);
    }
  }, [list]);

  function handleSubmit(e) {
    e.preventDefault();
    let isDuplicated = list.find(({ text }) => text == currentTask["text"]);
    if (!isDuplicated) {
      setList([...list, currentTask]);
    }
    setCurrentTask(emptyTask);
  }

  switch (type) {
    case "All":
      activeList = list;
      break;
    case "Active":
      activeList = list.filter(({ text, status }) => status != "Completed");
      break;
    case "Completed":
      activeList = list.filter(({ text, status }) => status == "Completed");
      break;
  }

  function handleDragStart(index) {
    setDraggedItemIndex(index);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(index) {
    const newList = [...list];
    const [draggedItem] = newList.splice(draggedItemIndex, 1);
    newList.splice(index, 0, draggedItem);
    setList(newList);
    setDraggedItemIndex(null);
  }

  return (
    <section className="container__body">
      <h2 className="sr-only">Todo list</h2>
      <div className="body__input">
        <span className="input__icon"></span>
        <form className="input__form" action="#" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className="form__text"
            placeholder="Create a new todo.."
            value={currentTask["text"]}
            onChange={(e) => setCurrentTask({ text: e.target.value, status: "active" })}
          />
          <button className="form__submit" aria-label="Press Enter to add the task"></button>
        </form>
      </div>
      <div className="body__todos">
        <ul className="todos__list">
          {activeList.map(({ text, status }, index) => {
            return (
              <Task
                title={text}
                status={status}
                list={list}
                setList={setList}
                key={text}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                index={index}
              />
            );
          })}
        </ul>
        <div className="todos__info">
          <span className="left-todos">{activeList.length} items left</span>
          <button
            className="clear-completed"
            onClick={() => setList(list.filter(({ text, status }) => status != "Completed"))}
          >
            Clear Completed
          </button>
        </div>
        <div className="todos__sort">
          <button className={type == "All" ? "active" : ""} aria-label="Show all todos" onClick={() => setType("All")}>
            all
          </button>
          <button
            className={type == "Active" ? "active" : ""}
            aria-label="Show active todos only"
            onClick={() => setType("Active")}
          >
            active
          </button>
          <button
            className={type == "Completed" ? "active" : ""}
            aria-label="Show completed todos only"
            onClick={() => setType("Completed")}
          >
            completed
          </button>
        </div>
      </div>
    </section>
  );
}

export default TodoList;
