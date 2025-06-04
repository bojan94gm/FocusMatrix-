export default function MatrixExplanation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Q1 */}
      <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
            1
          </div>
          <h3 className="font-semibold text-red-700">Q1: Urgent & Important</h3>
        </div>
        <p className="text-sm text-gray-600">
          Tasks requiring <strong>immediate attention</strong> with
          <strong> significant consequences</strong>. Handle these first.
          <br />
          Examples: Crises, deadlines, critical problems
        </p>
      </div>

      {/* Q2 */}
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

      {/* Q3 */}
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

      {/* Q4 */}
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
  );
}
