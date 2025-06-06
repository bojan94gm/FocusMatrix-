export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About</h1>

        <p className="text-gray-700 mb-4">
          <strong>
            Welcome to FocusMatrix – Your Smart Task Prioritization Tool
          </strong>
        </p>

        <p className="text-gray-700 mb-4">
          FocusMatrix is a productivity app designed to help you manage your
          time and tasks more effectively by applying the
          <strong> Eisenhower Matrix</strong> – a proven method for
          decision-making and task prioritization.
        </p>

        <p className="text-gray-700 mb-4">
          Unlike traditional to-do lists, FocusMatrix doesn’t just store your
          tasks – it
          <strong> analyzes their urgency and importance</strong> to place them
          in one of four quadrants:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <strong>Quadrant 1</strong>: Urgent and Important – Do it now
          </li>
          <li>
            <strong>Quadrant 2</strong>: Not Urgent but Important – Schedule it
          </li>
          <li>
            <strong>Quadrant 3</strong>: Urgent but Not Important – Delegate it
          </li>
          <li>
            <strong>Quadrant 4</strong>: Not Urgent and Not Important –
            Eliminate it
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
          With an intuitive interface and simple controls, you can quickly:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Add new tasks with deadline, urgency and importance levels</li>
          <li>Automatically assign tasks to the right quadrant</li>
          <li>Mark tasks as completed</li>
          <li>Edit or delete tasks at any time</li>
        </ul>

        <p className="text-gray-700 mb-4">
          Whether you're a student, professional, or just looking to stay more
          organized, FocusMatrix helps you focus on
          <strong> what truly matters</strong> – and stop wasting time on what
          doesn't.
        </p>

        <p className="text-gray-700">
          Start taking control of your day, one decision at a time.
        </p>
      </section>
    </div>
  );
}
