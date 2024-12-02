import React, { useEffect, useState , useRef} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api_call from '../../Functions/api_call';
import { useNavigate } from 'react-router-dom';
import { getAllSkills } from '../../Functions/CompleteProfile';
import { Snackbar, Alert } from '@mui/material'

const Hire = () => {
  const [data, setData] = useState([]);
  const { fetchApi, authuser } = api_call();
  const [user, setUser] = useState();
  const [allSkills, setAllSkills] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const dropdownRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    authuser().then((data) => {
      setUser(data);
      if (data?.role !== 'employer') {
        navigate('/');
      }
    });
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getAllSkills();
        setAllSkills(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setSnackbarMessage('Failed to fetch skills.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };
    fetchSkills();
  }, []);




  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      selectedSkills: [],
      jobDescription: '',
      companyName: '',
      salary: '',
      duration: '',
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required('Job Title is required'),
      selectedSkills: Yup.array().min(1, 'At least one skill is required'),
      jobDescription: Yup.string().required('Job Description is required'),
      companyName: Yup.string().required('Company Name is required'),
      salary: Yup.number().required('Salary is required').positive('Salary must be positive'),
      duration: Yup.string().required('Duration is required'),
    }),
    onSubmit: async (values) => {
      try {
      const response = await fetchApi('/api/post-job' , 'POST' , values);
      console.log(response?.success);
      if(response?.success){
        setSnackbarMessage('Job posted successfully.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        // clear form
        formik.resetForm();
      }

      } catch (error) {
        console.error('Error posting job:', error);
        setSnackbarMessage('Failed to post job.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    },
  });

  const normalizeString = (str) => str.toLowerCase().trim();

  const filteredSkills = allSkills.filter((skill) => normalizeString(skill.skill).includes(normalizeString(newSkill)))
    .slice(0, 5);

  const handleSkillClick = (skill) => {
     console.log(skill);
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      formik.setFieldValue('selectedSkills', [...selectedSkills, skill]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(updatedSkills);
    formik.setFieldValue('selectedSkills', updatedSkills);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 mt-36 mb-10 bg-white shadow-xl rounded-3xl">
    <h1 className="text-4xl font-bold text-center mb-10 ">Post a New Job</h1>
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Job Title */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g., Software Developer"
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {formik.touched.jobTitle && formik.errors.jobTitle ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.jobTitle}</div>
        ) : null}
      </div>
  
      {/* Skills Required */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Skills Required:</label>
        <div ref={dropdownRef} className="relative">
          <input
            type="text"
            value={newSkill}
            placeholder="Type to search skills"
            onChange={(e) => setNewSkill(e.target.value)}
            onFocus={() => setIsDropdownVisible(true)}
            className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap mt-3">
            {selectedSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mr-3 mb-3"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-indigo-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          {isDropdownVisible && (
            <div className="absolute bg-white border border-gray-300 shadow-lg rounded-lg w-full mt-2 max-h-52 overflow-y-auto">
              {filteredSkills.length === 0 ? (
                <div className="px-4 py-3 text-gray-500">No skills found</div>
              ) : (
                filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    onClick={() => handleSkillClick(skill.skill)}
                    className="px-4 py-3 hover:bg-indigo-50 cursor-pointer"
                  >
                    {skill.skill}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
  
      {/* Job Description */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Job Description:</label>
        <textarea
          name="jobDescription"
          value={formik.values.jobDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={6}
          placeholder="Describe the job in detail..."
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        {formik.touched.jobDescription && formik.errors.jobDescription ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.jobDescription}</div>
        ) : null}
      </div>
  
      {/* Company Name */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g., Tech Corp"
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.companyName}</div>
        ) : null}
      </div>
  
      {/* Salary */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Salary:</label>
        <input
          type="number"
          name="salary"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g., 50000"
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {formik.touched.salary && formik.errors.salary ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.salary}</div>
        ) : null}
      </div>
  
      {/* Duration */}
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Duration:</label>
        <input
          type="text"
          name="duration"
          value={formik.values.duration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g., 3 months"
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {formik.touched.duration && formik.errors.duration ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.duration}</div>
        ) : null}
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gray-600 text-white py-4 rounded-lg shadow-md hover:bg-gray-900 transition-transform transform hover:scale-105  duration-300"
      >
        Done 
      </button>
    </form>
  
    {/* Snackbar */}
    <Snackbar
      open={openSnackbar}
      autoHideDuration={4000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        sx={{ width: '100%' }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </div>
  
  );
};

export default Hire;