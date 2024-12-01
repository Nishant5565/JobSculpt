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
    <div className="max-w-2xl mx-auto p-4 mt-36">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Software Developer'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
          {formik.touched.jobTitle && formik.errors.jobTitle ? (
            <div className="text-red-600 text-sm">{formik.errors.jobTitle}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills Required:</label>
          <div ref={dropdownRef} className="relative w-full">
            <input
              placeholder="Type to search skills"
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
              className="w-full py-3 pl-2 border-2 rounded-md outline-none transition-all duration-300"
            />
            <div className="flex flex-wrap mt-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {isDropdownVisible && (
              <div className="absolute bg-white shadow-lg w-[400px]">
                {filteredSkills.length === 0 ? (
                  <div
                    className={`cursor-pointer rounded-[20px] ${
                      theme === 'dark'
                        ? 'hover:bg-[#1E1E1E] text-white'
                        : 'hover:bg-[#F3F4F6] text-black'
                    } px-4 py-3 mt-2 transition-all duration-300`}
                  >
                    No skills found
                  </div>
                ) : (
                  filteredSkills.map((skill, index) => (
                    <ul
                      key={skill._id}
                      onClick={() => handleSkillClick(skill.skill)}
                      className={`cursor-pointer rounded-[20px] ${
                        theme === 'dark'
                          ? 'hover:bg-[#1E1E1E] text-white'
                          : 'hover:bg-[#F3F4F6] text-black'
                      } px-4 py-3 mt-2 transition-all duration-300`}
                    >
                      <li>{skill.skill}</li>
                    </ul>
                  ))
                )}
              </div>
            )}
          </div>
          {formik.touched.selectedSkills && formik.errors.selectedSkills ? (
            <div className="text-red-600 text-sm">{formik.errors.selectedSkills}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description:</label>
          <textarea
            name="jobDescription"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-52 p-2"
          />
          {formik.touched.jobDescription && formik.errors.jobDescription ? (
            <div className="text-red-600 text-sm">{formik.errors.jobDescription}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
          {formik.touched.companyName && formik.errors.companyName ? (
            <div className="text-red-600 text-sm">{formik.errors.companyName}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary:</label>
          <input
            type="number"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
          {formik.touched.salary && formik.errors.salary ? (
            <div className="text-red-600 text-sm">{formik.errors.salary}</div>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration:</label>
          <input
            type="text"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3"
          />
          {formik.touched.duration && formik.errors.duration ? (
            <div className="text-red-600 text-sm">{formik.errors.duration}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Post Job
        </button>
      </form>
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