import { useState } from "react";

function Task({
  title,
  status,
  list,
  setList,
  onDragStart: handleDragStart,
  onDragOver: handleDragOver,
  onDrop: handleDrop,
  index,
}) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(e) {
    setIsChecked(e.target.checked);
    const newList = list.map((task) => {
      if (task["text"] == title) {
        return { text: task["text"], status: e.target.checked ? "Completed" : "Active" };
      } else {
        return task;
      }
    });
    setList(newList);
  }

  return (
    <li
      className="list__item"
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
    >
      <div className="wrapper">
        <input type="checkbox" id={title} checked={status == "Completed"} onChange={(e) => handleChange(e)} />
        <label htmlFor={title} className="item__title">
          {title}
        </label>
      </div>
      <button className="remove">
        <img
          src="/images/icon-cross.svg"
          alt="Remove todo"
          onClick={() => setList(list.filter(({ text, status }) => text != title))}
        />
      </button>
    </li>
  );
}

export default Task;
