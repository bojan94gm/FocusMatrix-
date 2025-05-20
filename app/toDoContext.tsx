import React, { useReducer, createContext, useEffect, useContext } from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type State = Todo[];

type Action =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: Todo };

type ContextType = {
  todo: State;
  dispatch: React.Dispatch<Action>;
};

const initialTodo: Todo[] = (() => {
  try {
    const stored = JSON.parse(localStorage.getItem("zadaci") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
})();

function reducerFunction(todo: State, action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...todo, action.payload];
    case "DELETE_TODO":
      return todo.filter((task) => task.id !== action.payload);
    case "TOGGLE_TODO":
      return todo.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "EDIT_TODO":
      return todo.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
    default:
      return todo;
  }
}

const toDoContext = createContext<ContextType | undefined>(undefined);

export function ToDoProvider({ children }: { children: React.ReactNode }) {
  const [todo, dispatch] = useReducer(reducerFunction, initialTodo);

  useEffect(() => {
    localStorage.setItem("zadaci", JSON.stringify(todo));
  }, [todo]);

  return (
    <toDoContext.Provider value={{ todo, dispatch }}>
      {children}
    </toDoContext.Provider>
  );
}

export function useToDoContext() {
  const context = useContext(toDoContext);
  if (!context) throw new Error("Context must be in the toDoProvider");
  return context;
}
