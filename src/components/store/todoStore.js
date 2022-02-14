import React, { useReducer } from "react";

const initialState = {
  notes: [
    {
      id: 1,
      title: "Create clean app",
      task: "npx create-react-app",
      done: false,
    },
    {
      id: 2,
      title: "Clean app",
      task: "Delete and clean unnecessary stuff",
      done: false,
    },
    {
      id: 3,
      title: "Create store / context",
      task: "Create new file and use React.createContext()",
      done: false,
    },
  ],
};
export const NotesContext = React.createContext();
//reducer
const reducer = (state, action) => {
  //switch according to case
  switch (action.type) {
    case "ADD_NOTE":
      return {
        notes: [
          ...state.notes,
          {
            id: new Date().valueOf(),
            // title: action.todo.title,
            // task: action.todo.task,
            ...action.todo,
            done: false,
          },
        ],
      };
    case "REMOVE_NOTE":
      const newToDos = state.notes.filter((item) => item.id !== action.id);
      // newToDos.splice(
      //   newToDos.findIndex((item) => item.id === action.id),
      //   1
      // );
      return {
        ...state,
        notes: newToDos,
      };
    case "DONE_NOTE":
      const doneToggle = state.notes.map((item) => {
        return item.id === action.id
          ? { ...item, done: !item.done }
          : { ...item };
      });
      return {
        ...state,
        notes: doneToggle,
      };
    default:
      return state;
  }
};
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToDoItem = (todo) => {
    dispatch({
      type: "ADD_NOTE",
      todo: todo,
    });
  };
  const removeTodo = (id) => {
    dispatch({
      type: "REMOVE_NOTE",
      id: id,
    });
  };
  const doneTodo = (id) => {
    dispatch({
      type: "DONE_NOTE",
      id: id,
    });
  };
  const value = {
    notes: state.notes,
    addToDoItem: addToDoItem,
    removeTodo: removeTodo,
    doneTodo: doneTodo,
  };
  //value={initialState} include notes
  //value={value} include notes and action
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
