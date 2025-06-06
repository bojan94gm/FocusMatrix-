import { NavLink, useNavigate } from "react-router";
import { supabase } from "~/supabase-client";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Signing out error:", error);
      return;
    }
    navigate("/");
  }

  return (
    <div className="bg-blue-600 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-200"
        >
          focusMatrix
        </NavLink>

        <nav className="mt-4 sm:mt-0 flex flex-wrap sm:flex-nowrap sm:space-x-6 gap-4 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "underline underline-offset-4 text-white" : ""
              }`
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/matrix"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "underline underline-offset-4 text-white" : ""
              }`
            }
          >
            Priority Matrix
          </NavLink>
          <NavLink
            to="/routines"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "underline underline-offset-4 text-white" : ""
              }`
            }
          >
            Routines
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "underline underline-offset-4 text-white" : ""
              }`
            }
          >
            Completed
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-blue-200 transition ${
                isActive ? "underline underline-offset-4 text-white" : ""
              }`
            }
          >
            About
          </NavLink>
          <button
            onClick={handleSignOut}
            className="hover:text-blue-200 transition"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
}
