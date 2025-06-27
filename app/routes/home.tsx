import { supabase } from "~/supabase-client";
import type { Route } from "./+types/home";
import { useToDoContext } from "~/toDoContext";
import { type Todo } from "~/toDoContext";
import { memo, useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Eisenhower Matrix" },
    {
      name: "focusMatrix",
      content:
        "Welcome to the best and to the most simple tasks prioritization!",
    },
  ];
}

type TaskItemProps = {
  task: Todo;
  toggleTodo: (task: Todo) => void;
  editTask: (task: Todo) => void;
  deleteTask: (id: number) => void;
};

const TaskItem = memo(function TaskItem({
  task,
  toggleTodo,
  editTask,
  deleteTask,
}: TaskItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* indikator i „Past due“ */}
        <div className="flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${
              task.quadrant === 1
                ? "bg-red-500 animate-[pulse_0.5s_infinite]"
                : task.quadrant === 3
                ? "bg-yellow-500 animate-[pulse_1s_infinite]"
                : task.quadrant === 0
                ? "bg-black animate-[pulse_1s_infinite]"
                : ""
            }`}
          ></div>
          {task.quadrant === 0 && (
            <span className="text-xs font-semibold text-red-700 animate-pulse">
              Past due
            </span>
          )}
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTodo(task)}
          className="w-5 h-5 accent-blue-600 flex-shrink-0"
        />

        <span className="text-gray-800 truncate ml-2">{task.text}</span>
      </div>

      <div className="flex gap-2 ml-4 flex-shrink-0">
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
  );
});

function calculateDaysLeft(deadline: string) {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeDifference = deadlineDate.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

export default function Home() {
  const { todo, dispatch } = useToDoContext();
  const [urgency, setUrgency] = useState(3);
  const [importance, setImportance] = useState(3);
  const [deadline, setDeadline] = useState("");
  const [routine, setRoutine] = useState(false);

  async function addTask() {
    const textInput = document.getElementById("taskInput") as HTMLInputElement;
    const deadlineInput = document.getElementById(
      "deadline"
    ) as HTMLInputElement;
    const routineInput = document.getElementById("routine") as HTMLInputElement;
    const text = textInput.value.trim();

    if (textInput.value === "") {
      alert("Add task text");
      return;
    }

    const determineQuadrant = (
      deadline: string,
      importance: number,
      manualUrgency: number
    ): number => {
      let finalUrgency = manualUrgency;

      if (deadline && manualUrgency >= 4) {
        const daysLeft = calculateDaysLeft(deadline);

        if (daysLeft < 0) return 0;
        else if (daysLeft <= 1) finalUrgency = 5;
        else if (daysLeft <= 3) finalUrgency = Math.max(manualUrgency, 4);
        else if (daysLeft <= 7) finalUrgency = Math.max(manualUrgency, 3);
        else if (daysLeft <= 14) finalUrgency = Math.max(manualUrgency, 2);
      }

      if (finalUrgency >= 4 && importance >= 4) return 1;
      if (importance >= 4 && finalUrgency < 4) return 2;
      if (finalUrgency >= 4 && importance < 4) return 3;
      return 4;
    };

    const quadrant = determineQuadrant(deadline, importance, urgency);
    const tempId = Date.now();

    const optimisticTask: Todo = {
      id: tempId,
      text: text,
      completed: false,
      urgency: urgency,
      importance: importance,
      deadline: deadline,
      routine: routine,
      quadrant: quadrant,
    };

    dispatch({ type: "ADD_TODO", payload: optimisticTask });

    try {
      const { error, data } = await supabase
        .from("todo")
        .insert({
          text: textInput.value,
          completed: false,
          urgency: urgency,
          importance: importance,
          quadrant: quadrant,
          deadline: deadline,
          routine: routine,
        })
        .select()
        .single();

      if (error) throw error;

      dispatch({
        type: "UPDATE_ID",
        payload: { tempId: tempId, realTask: data },
      });
    } catch (error) {
      alert("Adding task failed");
      console.error("Insert task error: ", error);

      dispatch({
        type: "DELETE_TODO",
        payload: tempId,
      });

      alert("Adding task failed. Please try again.");
    }

    if (routine) {
      toast.success("Task added to Routines");
    }

    textInput.value = "";
    deadlineInput.value = "";
    routineInput.checked = false;
    setImportance(3);
    setUrgency(3);
    setDeadline("");
  }

  const deleteTask = useCallback(
    async (id: number) => {
      dispatch({ type: "DELETE_TODO", payload: id });
      const { error } = await supabase.from("todo").delete().eq("id", id);

      if (error) {
        console.error("Deleting task error: ", error);
      }
    },
    [dispatch]
  );

  const toggleTodo = useCallback(
    async (task: Todo) => {
      dispatch({ type: "TOGGLE_TODO", payload: task.id });

      const { error } = await supabase
        .from("todo")
        .update({ completed: !task.completed })
        .eq("id", task.id);

      if (error) {
        console.error("Toggling task error: ", error);
      }
    },
    [dispatch]
  );

  const editTask = useCallback(
    async (task: Todo) => {
      const textInput = document.getElementById(
        "taskInput"
      ) as HTMLInputElement;
      const urgencyInput = document.getElementById(
        "urgency"
      ) as HTMLInputElement;
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
    },
    [dispatch]
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 space-y-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create New Task
      </h1>

      {/* Form Section */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Task Details
        </h2>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="taskInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <input
              type="text"
              id="taskInput"
              placeholder="What needs to be done?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="urgency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Urgency:
                </label>
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {urgency}/5
                </span>
              </div>
              <input
                type="range"
                name="urgency"
                value={urgency}
                min={1}
                max={5}
                id="urgency"
                onChange={(e) => setUrgency(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="importance"
                  className="block text-sm font-medium text-gray-700"
                >
                  Importance:
                </label>
                <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  {importance}/5
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={importance}
                name="importance"
                id="importance"
                onChange={(e) => setImportance(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="routine"
                id="routine"
                onChange={(e) => setRoutine(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="routine"
                className="font-medium text-gray-700 flex items-center"
              >
                Routine Task
              </label>
              <p className="text-gray-500 mt-1">
                Enable to automatically repeat this task daily
              </p>
            </div>
          </div>

          <button
            onClick={addTask}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            One-time Tasks
          </h2>
          <span className="text-sm bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">
            To do:
            {todo.filter((t) => !t.completed && t.routine === false).length}
          </span>
        </div>

        <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
          {todo.map((task) =>
            task.completed || task.routine ? null : (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                editTask={editTask}
                toggleTodo={toggleTodo}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
