import React, { useContext, useState } from "react";
import classes from "./AddTodo.module.css";
import Button from "../UI/Button";
import { NotesContext } from "../store/todoStore";

const AddTodo = () => {
  const [todo, setTodo] = useState({ title: "", task: "" });
  const context = useContext(NotesContext);

  const formHandler = (e) => {
    //  onchange="formHandler" gives value that is typed in input field i.e todo
    setTodo((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));

    console.log(todo);
  };
  const addHandler = (e) => {
    e.preventDefault();
    console.log("onsubmit");
    context.addToDoItem(todo);
  };
  return (
    <form onSubmit={addHandler} className={classes.input}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" onChange={formHandler} />
      </div>
      <div>
        <label htmlFor="task">Task</label>
        <input type="text" id="task" name="task" onChange={formHandler} />
      </div>
      <Button type="submit">Add Task</Button>
    </form>
  );
};

export default AddTodo;
