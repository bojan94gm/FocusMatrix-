import React, { useReducer, createContext, useEffect, useContext } from "react";
import { supabase } from "./supabase-client";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  urgency: number;
  importance: number;
  deadline?: string;
  quadrant: number;
};

type State = Todo[];

type Action =
  | { type: "SET_TODO"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: Todo }
  | { type: "UPDATE_ID"; payload: { tempId: number; realTask: Todo } };

export type ContextType = {
  todo: State;
  dispatch: React.Dispatch<Action>;
};

function reducerFunction(todo: State, action: Action) {
  switch (action.type) {
    case "SET_TODO":
      return action.payload;
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
          ? {
              ...task,
              text: action.payload.text,
              urgency: action.payload.urgency,
              importance: action.payload.importance,
            }
          : task
      );
    case "UPDATE_ID":
      return todo.map((task) =>
        task.id === action.payload.tempId
          ? { ...action.payload.realTask }
          : task
      );
    default:
      return todo;
  }
}

const toDoContext = createContext<ContextType | undefined>(undefined);

export function ToDoProvider({ children }: { children: React.ReactNode }) {
  const [todo, dispatch] = useReducer(reducerFunction, []);

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await supabase
        .from("todo")
        .select("id,text,completed,urgency,importance,quadrant,deadline")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Toggling task error: ", error);
      }

      dispatch({ type: "SET_TODO", payload: data as Todo[] });
    }

    fetchData();
  }, []);

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
