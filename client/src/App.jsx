import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./components/HomePage";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<JobForm />} />
        <Route path="/jobs" element={<JobList />} />
      </Routes>

      {/* Toast container placed outside Routes so it works across pages */}
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
