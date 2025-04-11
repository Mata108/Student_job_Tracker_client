import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
        Student Job Tracker
      </h1>

      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
        Organize, track, and manage all your job applications in one place. Stay on top of every opportunity and never miss a follow-up again!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Job
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="bg-gray-100 text-blue-700 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-200 transition"
        >
          📋 View Applications
        </button>
      </div>

      <footer className="mt-12 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Made with ❤️ by Nikhil Sahu
      </footer>
    </div>
  );
};

export default HomePage;
