import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import "./style.css";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const focusRef = useRef<HTMLInputElement>(null);

  /**
   * @description Handles the done action
   * @param id
   */
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  /**
   * @description Handles delete tasks
   * @param id
   */
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /**
   * @description Handles the edit tasks
   * @param e
   * @param id
   */
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    focusRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={focusRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos_single--text"
        />
      ) : todo.isDone ? (
        <s className="todos_single--text">{todo.todo}</s>
      ) : (
        <span className="todos_single--text">{todo.todo} </span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <LuClipboardEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <RiDeleteBin5Line />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDownloadDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
