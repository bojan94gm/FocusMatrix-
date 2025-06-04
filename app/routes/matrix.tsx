import { useMemo, useState } from "react";
import { useToDoContext, type Todo } from "~/toDoContext";
import MatrixExplanation from "~/components/matrixExplanation";

export default function Matrix() {
  const { todo } = useToDoContext();
  const [showGuide, setShowGuide] = useState(false);

  const byQuadrant = useMemo(() => {
    const groups: Record<number, Todo[]> = { 1: [], 2: [], 3: [], 4: [] };

    todo
      .filter((task) => !task.completed)
      .forEach((task) => {
        if (groups[task.quadrant]) {
          groups[task.quadrant].push(task);
        }
      });

    return groups;
  }, [todo]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Eisenhower Matrix Guide
      </h2>

      <div className="flex justify-center">
        <button
          onClick={() => setShowGuide((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showGuide ? "Hide Guide" : "Show Guide"}
        </button>
      </div>

      {showGuide && <MatrixExplanation />}

      {/* Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Q1: Urgent & Important */}
        <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200 hover:border-red-300 transition-colors">
          <h2 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <span className="text-lg">🔥</span>
            Q1: Urgent & Important
          </h2>
          <div className="space-y-2">
            {byQuadrant[1].map((t) => (
              <div
                key={t.id}
                className="p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-red-600">• {t.text}</span>
              </div>
            ))}
            {byQuadrant[1].length === 0 && (
              <p className="text-gray-400 text-sm">
                No tasks here - great job! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Q2: Not Urgent & Important */}
        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors">
          <h2 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <span className="text-lg">🌱</span>
            Q2: Not Urgent & Important
          </h2>
          <div className="space-y-2">
            {byQuadrant[2].map((t) => (
              <div
                key={t.id}
                className="p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-green-600">• {t.text}</span>
              </div>
            ))}
            {byQuadrant[2].length === 0 && (
              <p className="text-gray-400 text-sm">
                Schedule strategic tasks here 📅
              </p>
            )}
          </div>
        </div>

        {/* Q3: Urgent & Not Important */}
        <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:border-yellow-300 transition-colors">
          <h2 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            Q3: Urgent & Not Important
          </h2>
          <div className="space-y-2">
            {byQuadrant[3].map((t) => (
              <div
                key={t.id}
                className="p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-yellow-600">• {t.text}</span>
              </div>
            ))}
            {byQuadrant[3].length === 0 && (
              <p className="text-gray-400 text-sm">
                Perfect! No time-wasters here ⏳
              </p>
            )}
          </div>
        </div>

        {/* Q4: Not Urgent & Not Important */}
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors">
          <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-lg">🚫</span>
            Q4: Not Urgent & Not Important
          </h2>
          <div className="space-y-2">
            {byQuadrant[4].map((t) => (
              <div
                key={t.id}
                className="p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-600">• {t.text}</span>
              </div>
            ))}
            {byQuadrant[4].length === 0 && (
              <p className="text-gray-400 text-sm">
                No distractions - keep it up! 💪
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
