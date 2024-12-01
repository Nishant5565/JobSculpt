import React, { useState, useEffect } from 'react';
import { Box, TextField, Snackbar, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { getSkillsHiring, addSkillHiring, getAllSkills, updateProfileCompleteStatus, deleteSkillHiring } from '../../Functions/CompleteProfile';
import { useNavigate } from 'react-router-dom';

const EmployerProfile = ({ user, setStep, theme }) => {
  const [skillsHiring, setSkillsHiring] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [allSkills, setAllSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
     
  const handleAddSkill = async (skill) => {
    try {
      const response = await addSkillHiring(skill);
      if (response.status === 200) {
        setSkillsHiring((prev) => [...prev, { skill }]); // Add new skill to the state
        setNewSkill('');
        setSearchTerm(''); // Clear the search input
        setSnackbarSeverity('success');
        setSnackbarMessage('Skill added successfully');
        setOpenSnackbar(true);
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error adding skill');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Error adding skill:', err);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error adding skill');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteSkill = async (skill) => {
    try {
      const response = await deleteSkillHiring(skill);
      if (response.status === 200) {
        setSkillsHiring((prev) => prev.filter((s) => s.skill !== skill));
        setSnackbarSeverity('success');
        setSnackbarMessage('Skill deleted successfully');
        setOpenSnackbar(true);
      } else {
        setSnackbarSeverity('error');
        setSnackbarMessage('Error deleting skill');
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error deleting skill');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const fetchSkillsHiring = async () => {
      const skills = await getSkillsHiring();
      setSkillsHiring(skills);
    };

    getAllSkills().then((skills) => {
      setAllSkills(skills);
    });

    fetchSkillsHiring();
  }, []);

  const next = () => {
     updateProfileCompleteStatus('Complete');
     setStep('Complete'); 
     navigate('/');
   };  
 
   

   const filteredSkills = allSkills
   .filter((skill) => 
     skill.skill.toLowerCase().includes(searchTerm.toLowerCase()) && 
     !skillsHiring.some((hiringSkill) => hiringSkill.skill === skill.skill)
   )
   .slice(0, 5);
 

  return (
    <Box className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <Box className={`w-full rounded-3xl p-8 transition-all duration-300`}>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold ">Complete your profile</h1>
        </div>

        <div className='font-normal text-center mt-2'>
          Add Skills That You Are Looking For
        </div>
        <Box className="mt-4 flex">
          <TextField
            label="Search Skills"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Box>

        <Box className="mt-4">
        <Box className="mt-4">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    onClick={() => handleAddSkill(skill.skill)}
                    className={`cursor-pointer rounded-[20px] ${theme === 'dark' ? 'hover:bg-[#1E1E1E] text-white' : 'hover:bg-[#F3F4F6] text-black'} px-4 py-3 mt-2 transition-all duration-300`}
                  >
                    {skill.skill}
                  </div>
                ))}
              </Box>

          <div className=" text-end w-full mt-5">
          <button
            onClick={next}
            className={`px-10 py-3 rounded-full ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white hover:bg-white hover:text-black '} transition-all duration-300\
            hover:scale-105`}
          >
            Next
          </button>
        </div>
        <Box className="mt-4 flex gap-2 flex-wrap">
          {skillsHiring.map((skill, index) => (
            <Box key={index} className="mb-2 flex justify-between items-center border-2 rounded-full p-2">
              <span>{skill.skill}</span>
              <IconButton onClick={() => handleDeleteSkill(skill.skill)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployerProfile;