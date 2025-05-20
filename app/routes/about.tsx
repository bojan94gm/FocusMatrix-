export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        About This To-Do App
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Welcome to our To-Do application! This app is designed to help you
        manage your tasks and stay organized with ease. Whether it's personal or
        professional, you can use this simple and intuitive tool to track what
        needs to be done and stay on top of your goals.
      </p>
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        Features include:
      </p>
      <ul className="list-disc pl-5 text-lg text-gray-600 mb-6">
        <li>Create, edit, and delete tasks.</li>
        <li>Mark tasks as completed.</li>
        <li>Organize your tasks and stay on top of deadlines.</li>
        <li>Simple and user-friendly interface.</li>
      </ul>
      <p className="text-lg text-gray-600 leading-relaxed mb-4">
        We hope this app helps you stay productive and focused on what matters
        most. Thank you for using our app!
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">
        If you have any questions or feedback, feel free to reach out to us.
      </p>
    </div>
  );
}
