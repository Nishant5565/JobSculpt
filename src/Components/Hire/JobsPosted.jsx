import React, { useEffect, useState } from 'react';
import api_call from '../../Functions/api_call';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

const JobsPosted = () => {
  const { authuser, fetchApi } = api_call();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [viewApplicants, setViewApplicants] = useState(false);
  const [applicantUsers, setApplicantUsers] = useState(null);
  const fetchJobs = async () => {
    const response = await fetchApi(`/api/employer-jobs`, 'GET');
    setJobs(response);
  };

  const [userDetails, setUserDetails] = useState([]);
  
  const fetchApplicants = async (jobId) => {
    const response = await fetchApi(`/api/job-applicants/${jobId}`, 'GET');
    const formattedApplicants = response?.applicants.map(applicant => ({
      ...applicant,
      userId: applicant.userId.toString()
    }));

    // map the user details to the applicants

    const userResponse = await fetchApi(`/api/user-details`, 'POST', { userIds: formattedApplicants.map(applicant => applicant.userId) });

    
    
    setApplicants(formattedApplicants);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = async (job) => {
    console.log('Opening modal for job:', job);
    setSelectedJob(job);
    setViewApplicants(false);
    setOpen(true);
    console.log('Modal open state:', true);
  };
  
  const handleClose = () => {
    console.log('Closing modal');
    setOpen(false);
    setSelectedJob(null);
    console.log('Modal open state:', false);
  };

  const deleteJob = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;

    const response = await fetchApi(`/api/delete-job/${id}`, 'DELETE');
    console.log(response);
    if (response.msg === 'Job removed') {
          fetchJobs();
          handleClose();
    }
  };

  const handleViewApplicants = async () => {
    await fetchApplicants(selectedJob._id);
    setViewApplicants(true);
  };

  return (
<div className="max-w-6xl mx-auto p-10 mt-16 bg-gray-50 rounded-2xl shadow-lg">
  <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Jobs Posted by You</h2>

  <ul className="space-y-8">
    {jobs.map((job) => (
      <li
        key={job._id}
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-200 flex justify-between items-center"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
          <p className="text-sm text-gray-500 mt-2">
            <span className="font-medium">Posted on:</span>{' '}
            {new Date(job.postedDate).toLocaleDateString()}
          </p>
        </div>
        <button
          className="bg-teal-500 text-white py-2 px-5 rounded-lg font-medium hover:bg-teal-600 transition"
          onClick={() => handleOpen(job)}
        >
          View Details
        </button>
      </li>
    ))}
  </ul>

  <Modal open={open} onClose={handleClose} className="flex justify-center my-10 relative">
    <Box className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-4xl mx-auto border border-gray-200 overflow-y-auto relative">
      {selectedJob && (
        <>
          {/* Job Title */}
          <h3 className="text-2xl font-bold text-center text-gray-800 border-b pb-4 mb-8">
            {selectedJob.jobTitle}
          </h3>

          {/* Job Details */}
          {!viewApplicants ? (
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                <span className="font-semibold">Company Name:</span> {selectedJob.companyName}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Job Description:</span>{' '}
                {selectedJob.jobDescription}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Salary:</span> ${selectedJob.salary}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Duration:</span> {selectedJob.duration}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Required Skills:</span>{' '}
                {selectedJob.requiredSkills.join(', ')}
              </p>

              {/* Show Applicants Button */}
              <div className="flex justify-center mt-10">
                <div
                  className="bg-black text-white rounded-lg font-medium transition px-6 py-3 cursor-pointer"
                  onClick={handleViewApplicants}
                >
                  Show Applicants
                </div>
              </div>
            </div>
          ) : (
            /* Applicants List */
            <div className="space-y-6 text-gray-700">
              <p className="text-lg font-semibold">Applicants:</p>
              <ul className="list-disc ml-6">
                {applicants.map((applicant, index) => (
                  <li key={index} className="mt-2">
                    <span className="font-medium mb-2">User ID:</span> {applicant.userId} 
                    <div className="font-medium mt-5">Cover Letter:</div>{' '}
                    {applicant.coverLetter}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-center mt-10 space-x-4 absolute bottom-10 right-10">
            <div
              className="bg-gray-200 text-gray-700 rounded-lg font-medium transition px-6 py-3 cursor-pointer"
              onClick={handleClose}
            >
              Close
            </div>
            <div
              onClick={() => deleteJob(selectedJob._id)}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition cursor-pointer"
            >
              Delete
            </div>
          </div>
        </>
      )}
    </Box>
  </Modal>
</div>

  );
};

export default JobsPosted;