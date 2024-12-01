import React, { useEffect, useState } from 'react';
import api_call from '../../Functions/api_call';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

const JobsPosted = () => {
  const { authuser, fetchApi } = api_call();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobs = async () => {
    const response = await fetchApi(`/api/employer-jobs`, 'GET');
    setJobs(response);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
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

  return (
    <div className="max-w-5xl mx-auto p-8 mt-20 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Jobs Posted by You</h2>
      <ul className="space-y-6">
        {jobs.map((job) => (
          <li
            key={job._id}
            className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">{job.jobTitle}</h3>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-medium">Posted on:</span> {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
            <div
              className="bg-black text-white py-2 px-6 rounded-full cursor-pointer"
              onClick={() => handleOpen(job)}
            >
              View Details
            </div>
          </li>
        ))}
      </ul>

      <Modal open={open} onClose={handleClose} className=' flex justify-center mt-20 '>
        <Box className="bg-white rounded-xl shadow-lg p-8 w-2/3 h-[60vh] mx-auto mt-20 border border-gray-200 overflow-y-scroll" >
          {selectedJob && (
            <>
               <div className='text-2xl font-semibold text-center border-b-2 mx-20 pb-3 mb-6'>
               {selectedJob.jobTitle}
               </div>
              <div className="space-y-6 mx-20">
                <p className=" font-normal text-[16px]">
                  <span className=" ">Company Name:</span> {selectedJob.companyName}
                </p>
                <p className=" font-nprmal text-[16px]">
                  <span className="">Job Description:</span> {selectedJob.jobDescription}
                </p>
                <p className="font-normal text-[16px]">
                  <span className="">Salary:</span> ${selectedJob.salary}
                </p>
                <p className="font-normal text-[16px]">
                  <span className="">Duration:</span> {selectedJob.duration}
                </p>
                <p className="font-normal text-[16px]">
                  <span className="font-medium text-gray-700">Required Skills:</span> {selectedJob.requiredSkills.join(', ')}
                </p>
              </div>
               <div className="flex justify-center">
               <div
                className="bg-black text-white mt-20 py-3 px-8 cursor-pointer rounded-full w-fit"
                onClick={handleClose}
              >
                Close
              </div>

                 <div    
                    className="bg-red-500 text-white mt-20 py-3 px-8 cursor-pointer rounded-full w-fit ml-4"
                    onClick={() => deleteJob(selectedJob._id)}
                    > Delete Job </div>

               </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default JobsPosted;