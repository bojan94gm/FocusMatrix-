import { useToDoContext } from "~/toDoContext";

export default function Completed() {
  const { todo, dispatch } = useToDoContext();

  const completedTasks = todo.filter((task) => {
    return task.completed;
  });

  return completedTasks.length === 0 ? (
    <div className="text-center text-gray-500 mt-10 text-xl font-semibold animate-pulse">
      No completed tasks
    </div>
  ) : (
    <div className="flex justify-center">
      <ul className="space-y-3 w-full max-w-xl">
        {completedTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: task.id })
                }
                className="w-5 h-5 accent-green-600"
              />
              <span
                className={`text-base ${
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
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: task.id })
                }
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
