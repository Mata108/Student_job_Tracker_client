import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, { status: newStatus });
      fetchJobs(); // Refresh jobs
      toast.success("Status updated!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`);
        fetchJobs(); // Refresh jobs
        toast.success("Job deleted!");
      } catch (err) {
        console.error("Failed to delete job:", err);
        toast.error("Failed to delete job!");
      }
    }
  };

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-10">
    <div className="max-w-5xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Homepage
          </button>

          <button
            onClick={() => navigate("/add")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add New Job
          </button>
        </div>

      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Job Applications</h2>
  
      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["All", "Applied", "Interview", "Offer", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full border font-medium shadow-sm ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-700 border-blue-300"
            } hover:bg-blue-500 hover:text-white transition duration-200`}
          >
            {status}
          </button>
        ))}
      </div>
  
      {/* Sort Button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-white border border-gray-300 text-sm px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
          onClick={() => {
            const sorted = [...jobs].sort((a, b) => new Date(b.date) - new Date(a.date));
            setJobs(sorted);
          }}
        >
          Sort by Latest
        </button>
      </div>
  
      {/* Job Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No jobs to display.</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-700">{job.company}</h3>
              <p className="text-gray-600 font-medium">{job.role}</p>
  
              {/* Status dropdown */}
              <div className="mt-3">
                <label className="font-medium text-sm mr-2">Status:</label>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  className="border border-gray-300 px-3 py-1 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
  
              <p className="text-sm mt-2 text-gray-500">
                Applied on: <span className="font-medium">{new Date(job.date).toLocaleDateString()}</span>
              </p>
  
              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-blue-500 hover:underline text-sm"
                >
                  View Job Posting
                </a>
              )}
  
              {/* Action Button */}
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  
  );
};

export default JobList;
