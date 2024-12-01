import React, { useState } from 'react';
import api_call from '../../Functions/api_call';
import { Snackbar, Alert } from '@mui/material';
const JobCard = ({ job }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const { authuser, fetchApi } = api_call();
  const [coverLetter, setCoverLetter] = useState('');

  const handleApply = () => {
    authuser().then((data) => {
      if (data) {

        console.log(job._id, data._id);
        fetchApi('/api/apply-job', 'POST', { jobId: job._id, userId: data._id
          , coverLetter: coverLetter
         }).then((response) => {
          if (response.success) {
            setOpenSnackbar(true);
            setMessage('Applied successfully!');
            setSeverity('success');
            handleClose();
          }else {
            setOpenSnackbar(true);
            setMessage('Failed to apply!');
            setSeverity('error');

          }
        });
      }
    });
  };

  return (
    <div className=" w-[240px] rounded-[10px] overflow-hidden shadow-lg px-4 py-10 flex flex-col items-center justify-center bg-white">
      <div className="px-6 py-4 text-nowrap">
        <div className="font-bold text-xl mb-2">{job.jobTitle}</div>
        <p className="text-gray-700 text-base">{job.companyName}</p>
        <p className="text-gray-700 text-base">{job.duration}</p>
        <p className="text-gray-700 text-base">Salary: ${job.salary}</p>
        <button
          className="mt-10 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          More Details
        </button>
      </div>
      {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity" 
      onClick={handleClose}
    ></div>

    {/* Modal Content */}
    <div className="relative bg-white rounded-2xl shadow-xl w-11/12 max-w-3xl mx-auto h-[65vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800">
          {job.jobTitle} at {job.companyName}
        </h2>
      </div>

      {/* Modal Body */}
      <div className="p-6 space-y-6 text-gray-700">
        <p className="whitespace-pre-line leading-relaxed text-lg">
          {job.jobDescription}
        </p>

        <p className="leading-relaxed">
          <strong className=" text-gray-900">Required Skills:</strong>{' '}
          <span className="text-gray-600">{job.requiredSkills.join(', ')}</span>
        </p>

        <div className="mt-4">
                <label className="block font-bold mb-2" htmlFor="coverLetter">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Write a cover letter..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:shadow-outline h-40 "
          />
        </div>


      </div>

      {/* Modal Footer */}
      <div className="p-6 flex justify-end space-x-4 absolute bottom-0 right-0">
        <button
          className="px-5 py-2 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="px-5 py-2 rounded-lg font-medium text-white bg-black hover:scale-105 transition-all duration-300 focus:outline-none"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default JobCard;