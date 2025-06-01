import { supabase } from "~/supabase-client";
import type { Route } from "./+types/home";
import { useToDoContext } from "~/toDoContext";
import { type Todo } from "~/toDoContext";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ToDo App" },
    {
      name: "ToDo application",
      content: "Welcome to the best and to the most simple todo app!",
    },
  ];
}

export default function Home() {
  const { todo, dispatch } = useToDoContext();
  const [urgency, setUrgency] = useState(3);
  const [importance, setImportance] = useState(3);

  async function addTask() {
    const textInput = document.getElementById("taskInput") as HTMLInputElement;

    const determineQuadrant = (): number => {
      if (urgency >= 4 && importance >= 4) return 1;
      if (importance >= 4 && urgency < 4) return 2;
      if (urgency >= 4 && importance < 4) return 3;
      return 4;
    };

    const quadrant = determineQuadrant();

    if (textInput.value === "") {
      alert("Add task text");
      return;
    }

    const { error, data } = await supabase
      .from("todo")
      .insert({
        text: textInput.value,
        completed: false,
        urgency: urgency,
        importance: importance,
        quadrant: quadrant,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert task error: ", error);
      return;
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: data,
      });
    }
    textInput.value = "";
  }

  async function deleteTask(id: number) {
    dispatch({ type: "DELETE_TODO", payload: id });
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
      console.error("Deleting task error: ", error);
    }
  }

  async function toggleTodo(task: Todo) {
    dispatch({ type: "TOGGLE_TODO", payload: task.id });

    const { error } = await supabase
      .from("todo")
      .update({ completed: !task.completed })
      .eq("id", task.id);

    if (error) {
      console.error("Toggling task error: ", error);
    }
  }

  function editTask(task: Todo) {
    const textInput = document.getElementById("taskInput") as HTMLInputElement;
    const urgencyInput = document.getElementById("urgency") as HTMLInputElement;
    const importanceInput = document.getElementById(
      "importance"
    ) as HTMLInputElement;

    textInput.value = task.text;
    urgencyInput.value = String(task.urgency);
    importanceInput.value = String(task.importance);

    textInput.focus();

    const saveEdit = async (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      textInput.removeEventListener("keydown", saveEdit);

      const newText = textInput.value.trim();
      const newUrgency = parseInt(urgencyInput.value, 10);
      const newImportance = parseInt(importanceInput.value, 10);

      if (!newText) {
        textInput.focus();
        return;
      }

      dispatch({
        type: "EDIT_TODO",
        payload: {
          ...task,
          text: newText,
          urgency: newUrgency,
          importance: newImportance,
        },
      });

      const { error } = await supabase
        .from("todo")
        .update({
          text: newText,
          urgency: newUrgency,
          importance: newImportance,
        })
        .eq("id", task.id);

      if (error) {
        console.error("Editing task error:", error);
      }

      textInput.value = "";
      urgencyInput.value = "3";
      importanceInput.value = "3";
    };

    textInput.addEventListener("keydown", saveEdit);
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Todo List
      </h1>

      <div className="flex flex-col items-center gap-3">
        <input
          type="text"
          id="taskInput"
          placeholder="Write task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="urgency">Task Urgency</label>
        <input
          type="range"
          name="urgency"
          value={urgency}
          min={1}
          max={5}
          id="urgency"
          onChange={(e) => setUrgency(parseInt(e.target.value))}
        />

        <label htmlFor="importance">Task Importance</label>
        <input
          type="range"
          min={1}
          max={5}
          value={importance}
          name="importance"
          id="importance"
          onChange={(e) => setImportance(parseInt(e.target.value))}
        />

        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add task
        </button>
      </div>

      <hr className="border-t border-gray-200" />

      <ul className="space-y-3">
        {todo.map((task) =>
          task.completed ? (
            ""
          ) : (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTodo(task)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => editTask(task)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
