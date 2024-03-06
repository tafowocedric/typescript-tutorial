import React, { useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./todolist_styles.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = () => {
    if (!isEdit && !todo.isDone) setIsEdit(true);
  };

  const handleEditSubmit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEdit(false);
  };

  return (
    <form
      className="todos__single"
      onSubmit={(event) => handleEditSubmit(event, todo.id)}
    >
      {isEdit ? (
        <input
          className="todos__single--text"
          type="input"
          value={editTodo}
          onChange={(event) => setEditTodo(event.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todo_single--text">{todo.todo}</s>
      ) : (
        <span className="todo_single--text">{todo.todo}</span>
      )}
      {isEdit ? (
        <button type="submit">submit</button>
      ) : (
        <div>
          <span className="icon" onClick={handleEdit}>
            <AiFillEdit />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      )}
    </form>
  );
};

export default SingleTodo;
