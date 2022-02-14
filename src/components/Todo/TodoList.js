import React, { useContext } from "react";

import classes from "./TodoList.module.css";
import { NotesContext } from "../store/todoStore";
const TodoList = () => {
  //usecontext is context consumer
  const context = useContext(NotesContext);
  //console.log(context);
  const removeHandler = (id) => {
    console.log("clicked", id);
    context.removeTodo(id);
  };

  return (
    <div className={classes.todos}>
      <h1>Notes:</h1>
      {context.notes.map((note) => {
        return (
          <div
            key={note.id}
            className={`${classes.todo} ${
              note.done ? classes.done : classes.notDone
            }`}
            // onClick={() => removeHandler(note.id)}
            onClick={() => context.doneTodo(note.id)}
          >
            <h2>
              {/* {note.id}.*/} {note.title}
            </h2>
            <p>{note.task}</p>
            <span
              className={`material-icons ${classes.delete}`}
              onClick={() => removeHandler(note.id)}
            >
              delete
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
