import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JobForm = () => {

  const navigate = useNavigate();

  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: "",
  });
const live_url=`https://student-job-tracker-2-azi5.onrender.com`
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${live_url}/api/jobs`, job);

      toast.success("Job added successfully!");
      setJob({ company: "", role: "", status: "Applied", date: "", link: "" });
    } catch (err) {
        console.log(err)
      toast.error("Failed to add job!");
    }
  };

  return (
    <>
    <div className="w-full bg-gradient-to-r from-sky-100 to-blue-200">
    <div className="flex justify-around  mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500  mt-5  text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/jobs")}
          className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          View All Applications
        </button>
      </div>
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Add Job Application</h2>

   
      
      {/* Job Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={job.company}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          value={job.role}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <select
          name="status"
          value={job.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          name="date"
          value={job.date}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="url"
          name="link"
          placeholder="Job Link (optional)"
          value={job.link}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Job
        </button>
      </form>
    </div>
  </div>

    </div>
   
  </>
  );
};

export default JobForm;
