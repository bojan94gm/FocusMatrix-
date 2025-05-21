import { supabase } from "~/supabase-client";
import type { Route } from "./+types/home";
import { useToDoContext } from "~/toDoContext";
import { type Todo } from "~/toDoContext";

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

  async function addTask() {
    const tempId = Date.now();
    const textInput = document.getElementById("taskInput") as HTMLInputElement;
    dispatch({
      type: "ADD_TODO",
      payload: { id: tempId, text: textInput.value, completed: false },
    });

    const { error } = await supabase
      .from("todo")
      .insert({ text: textInput.value, completed: false })
      .select()
      .single();

    if (error) {
      console.error("Insert task error: ", error);
      dispatch({ type: "DELETE_TODO", payload: tempId });
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
    textInput.focus();
    textInput.value = task.text;

    if (!textInput.value.trim()) return;

    async function saveTask() {
      const editedTask = textInput.value;

      dispatch({ type: "EDIT_TODO", payload: { ...task, text: editedTask } });

      const { error } = await supabase
        .from("todo")
        .update({ text: editedTask })
        .eq("id", task.id);

      if (error) {
        console.error("Editing task error: ", error);
      }

      textInput.value = "";
    }

    textInput.onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter") saveTask();
    };
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Todo List
      </h1>

      <div className="flex items-center gap-3">
        <input
          type="text"
          id="taskInput"
          placeholder="Write task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
