import React, { useState } from "react";
import { supabase } from "~/supabase-client";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@dummyemail.com"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-between space-x-4">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-1/2 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-500 rounded-md hover:bg-blue-50"
        >
          {!isSignUp ? "Switch to Sign Up" : "Switch to Sign In"}
        </button>
        <button
          onClick={handleAuth}
          className="w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {!isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
