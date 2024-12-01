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

  const handleApply = () => {
    authuser().then((data) => {
      if (data) {

        console.log(job._id, data._id);
        fetchApi('/api/apply-job', 'POST', { jobId: job._id, userId: data._id }).then((response) => {
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-20 bg-white">
      <div className="px-6 py-4 text-nowrap">
        <div className="font-bold text-xl mb-2">{job.jobTitle}</div>
        <p className="text-gray-700 text-base">{job.companyName}</p>
        <p className="text-gray-700 text-base">{job.duration}</p>
        <p className="text-gray-700 text-base">Salary: ${job.salary}</p>
        <button
          className="mt-10 bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleOpen}
        >
          Know Details
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 h-[60vh] overflow-y-scroll  mx-auto z-50">
            <h2 className="text-2xl font-bold mb-4">
              {job.jobTitle} at {job.companyName}
            </h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line">{job.jobDescription}</p>
            <p className="text-gray-700 mb-4">
              <strong>Required Skills:</strong> {job.requiredSkills.join(', ')}
            </p>
            <div className=' flex  justify-between'>
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
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