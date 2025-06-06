import { memo, useCallback, useMemo } from "react";
import { supabase } from "~/supabase-client";
import { useToDoContext, type ContextType, type Todo } from "~/toDoContext";

type RoutineTaskItemProps = {
  task: Todo;
  dispatch: ContextType["dispatch"];
};

export default function Routines() {
  const { todo, dispatch } = useToDoContext();

  const routineTasks = useMemo(() => {
    return todo.filter((task) => task.routine);
  }, [todo]);

  const RoutineTaskItem = memo(({ task, dispatch }: RoutineTaskItemProps) => {
    const handleToggle = useCallback(async () => {
      dispatch({ type: "TOGGLE_TODO", payload: task.id });

      const { error } = await supabase
        .from("todo")
        .update({ completed: !task.completed })
        .eq("id", task.id);

      if (error) {
        console.error("Toggling task error: ", error);
      }
    }, [task.id, dispatch]);

    const handleDeleteTask = useCallback(async () => {
      dispatch({ type: "DELETE_TODO", payload: task.id });
      const { error } = await supabase.from("todo").delete().eq("id", task.id);
      if (error) {
        console.error("Deleting task error: ", error);
      }
    }, [task.id, dispatch]);

    return (
      <li
        key={task.id}
        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 accent-green-600"
          />
          <span
            className={`text-base ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.text}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDeleteTask}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </li>
    );
  });

  return routineTasks.length === 0 ? (
    <div className="text-center text-gray-500 mt-10 text-xl font-semibold animate-pulse">
      No routine tasks
    </div>
  ) : (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Routine Tasks</h2>
      <ul className="space-y-3 w-full max-w-xl">
        {routineTasks.map((task) => (
          <RoutineTaskItem key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
        Uncheck All
      </button>
    </div>
  );
}
