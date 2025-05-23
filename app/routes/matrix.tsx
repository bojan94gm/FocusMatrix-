import { useToDoContext, type Todo } from "~/toDoContext";

export default function Matrix() {
  const { todo } = useToDoContext();
  const byQuadrant: Record<number, Todo[]> = { 1: [], 2: [], 3: [], 4: [] };

  const notCompletedTasks = todo.filter((t) => t.completed === false);

  notCompletedTasks.forEach((t: Todo) => {
    const q = t.quadrant;
    if (byQuadrant[q]) {
      byQuadrant[q].push(t);
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Matrix Explanation */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Eisenhower Matrix Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                1
              </div>
              <h3 className="font-semibold text-red-700">
                Q1: Urgent & Important
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Tasks requiring <strong>immediate attention</strong> with
              <strong> significant consequences</strong>. Handle these first.
              <br />
              Examples: Crises, deadlines, critical problems
            </p>
          </div>

          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                2
              </div>
              <h3 className="font-semibold text-green-700">
                Q2: Not Urgent & Important
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Tasks important for <strong>long-term success</strong> but without
              immediate pressure. Schedule time for these.
              <br />
              Examples: Planning, relationship building, skill development
            </p>
          </div>

          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                3
              </div>
              <h3 className="font-semibold text-yellow-700">
                Q3: Urgent & Not Important
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Tasks requiring immediate attention but with
              <strong> low long-term value</strong>. Delegate or minimize these.
              <br />
              Examples: Interruptions, some meetings, most emails
            </p>
          </div>

          <div className="p-4 border-l-4 border-gray-500 bg-gray-50 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white">
                4
              </div>
              <h3 className="font-semibold text-gray-700">
                Q4: Not Urgent & Not Important
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Activities offering little to no value.
              <strong> Eliminate or limit</strong> these whenever possible.
              <br />
              Examples: Mindless scrolling, trivial tasks, excessive TV
            </p>
          </div>
        </div>
      </div>

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
