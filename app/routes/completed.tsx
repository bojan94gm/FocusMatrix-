import { memo, useCallback, useMemo } from "react";
import { supabase } from "~/supabase-client";
import { useToDoContext, type ContextType, type Todo } from "~/toDoContext";

type CompletedTaskItemProps = {
  task: Todo;
  dispatch: ContextType["dispatch"];
};

export default function Completed() {
  const { todo, dispatch } = useToDoContext();

  const completedTasks = useMemo(() => {
    return todo.filter((task) => task.completed);
  }, [todo]);

  const CompletedTaskItem = memo(
    ({ task, dispatch }: CompletedTaskItemProps) => {
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
        const { error } = await supabase
          .from("todo")
          .delete()
          .eq("id", task.id);
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
    }
  );

  return completedTasks.length === 0 ? (
    <div className="text-center text-gray-500 mt-10 text-xl font-semibold animate-pulse">
      No completed tasks
    </div>
  ) : (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Completed Tasks</h2>
      <ul className="space-y-3 w-full max-w-xl">
        {completedTasks.map((task) => (
          <CompletedTaskItem key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}
