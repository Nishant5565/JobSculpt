import React, { useEffect, useState } from 'react';
import api_call from '../../Functions/api_call';
import { Modal, Box, Typography, Button } from '@mui/material';

const JobsPosted = () => {
  const { fetchApi } = api_call();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [viewApplicants, setViewApplicants] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchJobs = async () => {
    const response = await fetchApi(`/api/employer-jobs`, 'GET');
    setJobs(response);
  };

  const fetchApplicants = async (jobId) => {
    const response = await fetchApi(`/api/job-applicants/${jobId}`, 'GET');
    setApplicants(response.applicants);
    setUserDetails(response.userDetails);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setViewApplicants(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
    setSelectedApplicant(null);
  };

  const handleViewApplicants = async () => {
    await fetchApplicants(selectedJob._id);
    setViewApplicants(true);
  };

  const handleApplicantDetails = (applicantId) => {
    const applicant = applicants.find(app => app.userId === applicantId);
    const userDetail = userDetails.find(user => user._id === applicantId);
    setSelectedApplicant({ ...applicant, ...userDetail });

// make it null if again clicked
    if (selectedApplicant) {
      setSelectedApplicant(null);
    }

  };


  return (
    <div className="max-w-6xl mx-auto p-10 mt-16 bg-gray-50 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Jobs Posted by You</h2>

      <ul className="space-y-8">
        {jobs.length === 0 && (
          <Typography variant="h6" className="text-center text-gray-500">
            No jobs posted by you yet.
          </Typography>
        )}
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

      <Modal open={open} onClose={handleClose} className="flex justify-center  my-10 relative">
        <Box className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-4xl mx-auto border border-gray-200 overflow-y-auto relative">
          {selectedJob && (
            <>

            <div className="relative">
            { viewApplicants && ( 
                    <div
                      onClick={() => setViewApplicants(false)}
                      className="absolute top-4 left-4 cursor-pointer text-gray-500"
                    >
                      Back
                    </div>
                  )}
              <h3 className="text-2xl font-bold text-center text-gray-800 border-b pb-4 mb-8">
                {selectedJob.jobTitle}
              </h3>
            </div>

              {/* back button  */}




              {!viewApplicants ? (
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg">
                    <span className="font-semibold">Company Name:</span> {selectedJob.companyName}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span> {selectedJob.jobDescription}
                  </p>  

                  <div
                    className="bg-black text-white rounded-lg font-medium transition px-6 py-3 cursor-pointer text-center mt-10"
                    onClick={handleViewApplicants}
                  >
                    Show Applicants
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-gray-700">
                  <p className="text-lg font-semibold">Applicants:</p>
                  <ul className="list-disc ml-6">
                    {applicants.map((applicant) => {
                      const user = userDetails.find(user => user._id === applicant.userId);
                      return (
                        <li key={applicant.userId} className="mt-2">
                          <p className="font-medium">
                            {user?.name || 'Name not available'} ({user?.email})
                          </p>
                          <button
                            className="mt-2 text-teal-500 underline"
                            onClick={() => handleApplicantDetails(applicant.userId)}
                            
                          >
                            Details
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {selectedApplicant && (
                <div className="mt-10 space-y-4">
                  <h4 className="text-xl font-semibold">Applicant Details:</h4>
                  <p><strong>Name:</strong> {selectedApplicant.name}</p>
                  <p><strong>Email:</strong> {selectedApplicant.email}</p>
                  <p><strong>Skills:</strong> {selectedApplicant.skills.map((skillObj) => skillObj.skill).join(', ')}</p>



                  <p><strong>Cover Letter:</strong> {selectedApplicant.coverLetter}</p>
                </div>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default JobsPosted;
