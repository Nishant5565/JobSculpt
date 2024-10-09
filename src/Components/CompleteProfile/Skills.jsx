import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Typography,
  Modal,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { addSkill, deleteSkill, getAllSkills,getUserSkills, updateProfileCompleteStatus } from '../../Functions/CompleteProfile';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from '@mui/icons-material/Search';

const Skills = ({ user, theme, setStep , editStep,setPreviewOpenModal, updateUserProfile}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [proficiency, setProficiency] = useState('Beginner');
  const [openProficiency, setOpenProficiency] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
  const fetchUserSkills = async () => {
    try {
      const skills = await getUserSkills();
      setUserSkills(skills);
    } catch (error) {
      console.error('Error fetching user skills:', error.msg);
      setSnackbarMessage('Failed to fetch user skills.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  useEffect(() => {
    fetchUserSkills();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSkill('');
  };

  const handleNext = () => {
    if(!editStep){
      setPreviewOpenModal(false);
      return;
    }
    if(userSkills.length <3){
      setSnackbarMessage("Please add atleast 3 skills to continue");
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    updateProfileCompleteStatus('Preview');
    setStep('Preview'); 
  };

  const handleAddSkill = async () => {
    if (!selectedSkill) return;

    try {
      const res = await addSkill(selectedSkill, proficiency);
      if(res.status === 200){
        setSnackbarMessage('Skill added successfully!');
        setSnackbarSeverity('success');
        fetchUserSkills();
      }else{
        setSnackbarMessage(res.response.data.msg);
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
      setOpenProficiency(false);
    } catch (error) {
      console.error('Error adding skill:', error);
      setSnackbarMessage('Error adding skill!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteSkill = async (skill) => {
    try {
      await deleteSkill(skill);
      setUserSkills(userSkills.filter((s) => s !== skill));
      setSnackbarMessage('Skill deleted successfully!');
      setSnackbarSeverity('success');
      fetchUserSkills();  
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setSnackbarMessage('Error deleting skill!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
const normalizeString = (str) => str.replace(/\s+/g, '').trim().toLowerCase();

const filteredSkills = allSkills.filter((skill) => normalizeString(skill.skill).includes(normalizeString(newSkill)))
  .slice(0, 5);

  return (
    <>
      <Typography
        variant="h4"
        className={`${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        } font-bold text-center`}
        sx={{
          marginBottom: '30px',
          fontSize: '30px',
          fontWeight: 'bold',
          color: theme === 'dark' ? '#fff' : '#333',
        }}
      >
        Add Your Skills
      </Typography>

      {userSkills?.length > 0  ? (
        <Box>
          <div className='flex flex-wrap gap-4'>
          {userSkills.map((skillObj) => (
              <ul key={skillObj._id}>
                <li
                className=' md:w-[200px] w-[160px]'
                  style={
                    {
                      color: theme === 'dark' ? 'white' : 'black',
                      transition: 'all 0.3s ease-in-out',
                      padding: '8px 10px',
                      borderRadius: '15px',
                      border: theme === 'dark' ? '2px solid white' : '2px solid black',
                      listStyle: 'none',
                    }

                  }
                 
                >
                  <p className='text-sm'>
                  {skillObj.skill}
                  </p>
                  <p className={` text-end ${theme === 'dark' ? 'text-[#d2d2d2]' : 'text-gray-800'}`}>  
                     {skillObj.proficiency}
                  </p>
                  </li>
              </ul>
            ))}
          </div>
          {
            userSkills?.length <3 && (
              <p className={` text-center mt-3 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} ${openDialog && ' hidden'}`}>
                Add at least 3 skills to get started.
              </p> )
          }
        </Box>
      ) : (
        <p className={` mt-3 mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} ${openDialog && ' hidden'}`}>
          You haven't added any skills yet. Skills help others to know more about you and show you Jobs that match your skills. Add at least 3 skills to get started.
        </p>
      )}

      <Modal open={openDialog} onClose={handleCloseDialog}>
        <Box
          sx={{
            position: 'absolute',
            height: '90vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme === 'dark' ? '#131313' : 'white',
            boxShadow: 24,
            p: 6,
            borderRadius: '25px',
            width: '90%',
            maxWidth: '700px',
            transition: 'all 0.3s ease-in-out',
            maxHeight: '90vh',
            overflowY: 'auto',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <div
            className={`text-center mb-6 text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Add a New Skill
          </div>
          <hr />

          <div className=' my-2 border-2 p-6 overflow-y-auto rounded-[20px] max-h-[290px] ScrollBar' 
          >
            <p className=' pb-2'>
              {userSkills?.length < 3 ? `Add ${3 - userSkills?.length} more skill to your profile` : null}
            </p>
            <div className='flex gap-2 flex-wrap '>
              {userSkills.map((skillObj) => (
                <ul key={skillObj._id} className=' border-2 rounded-[10px] px-2 transition-all duration-300 '>
                  <li className=' text-sm '> {skillObj.skill} 
                  <button onClick={() => handleDeleteSkill(skillObj.skill)} style={{color:'gray', background:'transparent' , padding:'5px'}} >
                    <DeleteIcon />
                  </button>
                  </li>
                 
                </ul>
                
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <input
              autoFocus
              placeholder="Search Skill"
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className={`w-full px-4 py-3 pl-10 border-2 rounded-full outline-none transition-all duration-300 ${theme === 'dark' ? 'bg-[#1E1E1E] border-[#4e4e4e] text-white' : 'text-black bg-[#F3F4F6] border-[#E5E7EB]'}`}
            />
            <SearchIcon
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            />
          </div>

          <div className='absolute'>
            {filteredSkills?.length === 0 ? (
              <div className={`cursor-pointer rounded-[20px] ${theme === 'dark' ? 'hover:bg-[#1E1E1E] text-white' : 'hover:bg-[#F3F4F6] text-black'} px-4 py-3 mt-2 transition-all duration-300`}>
                No skills found 
              </div>
            ) : (
              filteredSkills.map((skill) => (
                <ul
                  key={skill.id}
                  button
                  onClick={() => {
                    setSelectedSkill(skill.skill);
                    setOpenProficiency(true);
                  }}
                  className={`cursor-pointer rounded-[20px] ${theme === 'dark' ? 'hover:bg-[#1E1E1E] text-white' : 'hover:bg-[#F3F4F6] text-black'} px-4 py-3 mt-2 transition-all duration-300`}
                >
                  <li>
                    {skill.skill}
                  </li>
                </ul>
              ))
            )}
          </div>
          <button  onClick={() => setOpenDialog(false)} className={`px-10 absolute bottom-6 right-6 py-3  rounded-full ${theme == 'dark' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white '} transition-all duration-300`} >
              Cancel 
          </button>
        </Box>
        
      </Modal>

      <Button
        startIcon={ <Add />}
        variant="contained"
        onClick={() => {
          openDialog ? handleCloseDialog() : handleOpenDialog();
        }}
        sx={{
          marginTop: '20px',
          borderRadius: '30px',
          background: theme !== 'dark' ? 'white' : 'black',
          color: theme !== 'dark' ? 'black' : 'white',
          padding: '10px 20px',
          fontSize: '18px',
          border: '2px solid black',
          boxShadow:'none',
          textTransform: 'none',
          transition: 'all 0.2s ease-in',
          '&:hover': {
            transform: 'scale(1.02)',
            background: theme !== 'dark' ? 'black' : 'white',
            color: theme !== 'dark' ? 'white' : 'black',
          },
        }}
      >
         {
          userSkills?.length < 3 ? 'Add Skill' : 'Add More Skills'
         }
      </Button>

      {/* Snackbar for success or error messages */}
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

      <Modal open={openProficiency} onClose={() => setOpenProficiency(false)}>
        <Box
          sx={{
            position: 'absolute',
            height: '90vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme === 'dark' ? '#131313' : 'white',
            boxShadow: 24,
            p: 6,
            borderRadius: '25px',
            width: '90%',
            maxWidth: '700px',
            transition: 'all 0.3s ease-in-out',
            maxHeight: '90vh',
            overflowY: 'auto',
            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <div
            className={`text-center mb-6 text-2xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Select Proficiency Level for {selectedSkill}
          </div>
          <hr />
          <div className="flex  flex-col gap-16 w-[200px] mt-20 ">
          <div className='flex gap-4 border-b-2 p-2'>
            <input
              type = 'radio'
              name = 'proficiency'
              id = 'Beginner'
              className='cursor-pointer'

              onClick={() => {
                setProficiency('Beginner');
              }}
            />
            <label htmlFor="Beginner" className='cursor-pointer'>Beginner</label>
            </div>
              <div className='flex gap-4 border-b-2 p-2'>
              <input
              type = 'radio'
              name = 'proficiency'
              id = 'Intermediate'
              className='cursor-pointer'

              onClick={() => {
                setProficiency('Intermediate');
              }}
            />
              <label htmlFor="Intermediate" className=' cursor-pointer'>Intermediate</label> 
              </div>
            <div className='flex gap-4 border-b-2  p-2 '>
              <input
              type = 'radio'
              name = 'proficiency'
              className='cursor-pointer'
              id = 'Advanced'
              onClick={() => {
                setProficiency('Advanced');
              }}
            />
              <label htmlFor="Advanced" className=' cursor-pointer'>Advanced</label>
              </div>
          </div>
            <div className='flex justify-end gap-4 absolute bottom-10 right-10'>
            <button onClick={handleAddSkill} className={`px-10 mt-4  py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white '} transition-all duration-300`} >
              Add Skill
          </button>
          <button  onClick={() => setOpenProficiency(false)} className={`px-10 mt-4 py-3  rounded-full ${theme == 'dark' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white '} transition-all duration-300`} >
              Back 
          </button>
            </div>
        </Box>
      </Modal>
         <div className=" text-end w-full mt-5">
          <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white hover:bg-white hover:text-black '} transition-all duration-300\
            hover:scale-105`}
          >
            {
              editStep ? 'Next' : 'Close'
          }
          </button>
        </div>

    </>
  );
};

export default Skills;