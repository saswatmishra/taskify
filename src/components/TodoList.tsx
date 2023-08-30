import React from "react";
import "./style.css";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos_heading">Active Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            todos={todos}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>

      <div className="todos remove">
        <span className="todos_heading">Completed Tasks</span>
        {todos.map((todo) => (
          <SingleTodo
            todo={todo}
            todos={todos}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
