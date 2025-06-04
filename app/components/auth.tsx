import { useState } from "react";
import { supabase } from "~/supabase-client";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleAuth() {
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      console.log("U funkciji sam 1");
      if (error) {
        console.error("Sign up error: ", error);
        return null;
      }
    } else {
      console.log("U funkciji sam 2");
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Sign in error: ", error);
        return null;
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-gray-800">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-500">
          {isSignUp
            ? "Sign up to start prioritizing your tasks."
            : "Sign in to continue using Eisenhower Matrix."}
        </p>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@dummyemail.com"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Password field with show/hide toggle */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-3 text-xs text-blue-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-1/2 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-500 rounded-md hover:bg-blue-50 transition"
        >
          {!isSignUp ? "Switch to Sign Up" : "Switch to Sign In"}
        </button>
        <button
          onClick={handleAuth}
          disabled={isLoading}
          className={`w-1/2 px-4 py-2 text-sm font-medium text-white rounded-md transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : !isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
