import React, { useEffect, useState } from "react";
import FilterSearchBar from "../Utils/FilterSearchBar";

function InterviewSchedul() {
  const [jobPostings, setJobPostings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch(
          "https://erp-backend-o5i3.onrender.com/api/recruitment/get-job-posting"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job postings");
        }

        const data = await response.json();
        setJobPostings(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobPostings();
  }, []);

  const handleStatusChange = async (jobId, applicantId, newStatus) => {
    try {
      const response = await fetch(
        `https://erp-backend-o5i3.onrender.com/api/recruitment/update-applicant-job-posting/${jobId}/${applicantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update applicant status");
      }

      const updatedJobPosting = await response.json();

      setJobPostings((prevJobPostings) =>
        prevJobPostings.map((job) => {
          if (job._id === jobId) {
            return {
              ...job,
              applicants: job.applicants.map((applicant) =>
                applicant._id === applicantId
                  ? { ...applicant, status: newStatus }
                  : applicant
              ),
            };
          }
          return job;
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-[90%] flex flex-col p-7">
      <div className="flex justify-between">
        <p className="font-serif font-semibold text-gray-700 text-xl">
          / Recruitment & Onboarding / Interview Scheduling
        </p>
      </div>
      <FilterSearchBar />
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b px-4 py-2 text-left">S/N</th>
            <th className="border-b px-4 py-2 text-left">Job Title</th>
            <th className="border-b px-4 py-2 text-left">Applicant Name</th>
            <th className="border-b px-4 py-2 text-left">Email</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Change Status</th>
          </tr>
        </thead>

        <tbody>
          {jobPostings.length > 0 ? (
            jobPostings.map((job, jobIndex) =>
              job.applicants && job.applicants.length > 0 ? (
                job.applicants.map((applicant, applicantIndex) => (
                  <tr key={applicant._id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-2">
                      {`${applicantIndex + 1}`}
                    </td>
                    <td className="border-b px-4 py-2">{job.title}</td>
                    <td className="border-b px-4 py-2">{applicant.name}</td>
                    <td className="border-b px-4 py-2">{applicant.email}</td>
                    <td className="border-b px-4 py-2">{applicant.status}</td>
                    <td className="border-b px-4 py-2">
                      <select
                        value={applicant.status}
                        onChange={(e) =>
                          handleStatusChange(
                            job._id,
                            applicant._id,
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="applied">Applied</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={job._id}>
                  <td colSpan="6" className="border-b px-4 py-2 text-center">
                    No applicants found for {job.title}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewSchedul;
