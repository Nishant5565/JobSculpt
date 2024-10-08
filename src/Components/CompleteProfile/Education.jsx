import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Add, Close, Edit } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateEducation, editEducation, deleteEducation, updateWorkExperience, editWorkExperience, deleteWorkExperience , updateProfileCompleteStatus} from '../../Functions/CompleteProfile';
import {Delete} from '@mui/icons-material'

const Education = ({ user, theme, setStep, page, editStep, setPreviewOpenModal }) => {
  const [data, setData] = useState(page === 'education' ? user.education || [] : user.workExperience || []);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newData, setNewData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    company: '',
    position: '',
    from: null,
    to: null,
    description: '',
  });
  const handleNext = () => {

    if(!editStep){
      setPreviewOpenModal(false);
      return
    }
    
    if (page === 'education') {
      updateProfileCompleteStatus('Work');
      setStep('Work');
    } else {
      updateProfileCompleteStatus('Skills');
      setStep('Skills');
    }
};

  useEffect(() => {
    if (page === 'education') {
      setData(user.education || []);
    } else if (page === 'workExperience') {
      setData(user.workExperience || []);
    }
  }, [user, page]);

  const handleOpen = () => {
    setIsEditing(false); // Reset to adding mode
    setOpen(true);
  };

  const handleEditOpen = (index) => {
    setNewData(data[index]); // Populate form with existing data
    setEditIndex(index);
    setIsEditing(true); // Switch to editing mode
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      company: '',
      position: '',
      from: null,
      to: null,
      description: '',
    });
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (name, date) => {
    setNewData({
      ...newData,
      [name]: date,
    });
  };

  const handleSave = () => {
    if (isEditing) {
      const updatedData = [...data];
      updatedData[editIndex] = newData; // Update existing entry
      setData(updatedData);
      if (page === 'education') {
        editEducation(newData, editIndex); // Call edit API for education
      } else {
        editWorkExperience(newData, editIndex); // Call edit API for work experience
      }
    } else {
      const updatedData = [...data, newData]; // Add new entry
      setData(updatedData);
      if (page === 'education') {
        updateEducation(updatedData); // Call update API for education
      } else {
        updateWorkExperience(updatedData); // Call update API for work experience
      }
    }

    handleClose();
  };

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
          {page === 'education' ? 'Education Details' : 'Work Experience Details'}
        </Typography>

        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-[25px] mb-6 shadow-lg w-[400px] space-y-2 transition-all duration-200 hover:shadow-2xl ${
                theme === 'dark' ? 'bg-[#000000] border-2' : 'bg-[#f8f9fa]'
              }`}
            >
              <Typography
                variant="h6"
                className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                {page === 'education' ? item.institution || 'Institution Not Specified' : item.company || 'Company Not Specified'}
              </Typography>
              <Typography
                variant="body2"
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {page === 'education' ? item.degree || 'Degree Not Specified' : item.position || 'Position Not Specified'} - {item.fieldOfStudy || 'Field Not Specified'}
              </Typography>
              <Typography
                variant="body2"
                className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}
              >
                {item.from ? new Date(item.from).toLocaleDateString() : 'From Date Not Specified'} -
                {item.to ? new Date(item.to).toLocaleDateString() : 'Ongoing'}
              </Typography>
              <div className="flex justify-end">
              <IconButton onClick={() => handleEditOpen(index)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => {
                const updatedData = data.filter((_, i) => i !== index);
                setData(updatedData);
                if (page === 'education') {
                  deleteEducation(updatedData);
                } else {
                  deleteWorkExperience(updatedData);
                }
              }}>
                <Delete />
              </IconButton>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body" className=" text-[14px]" sx={{ mb: 3 }}>
            Add your {page === 'education' ? 'education' : 'work experience'} details to make your profile more attractive.
          </Typography>
        )}

        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleOpen}
          sx={{
            borderRadius: '30px',
            background: theme === 'dark' ? 'white' : 'black',
            color: theme === 'dark' ? 'black' : 'white',  
            padding: '10px 20px',
            fontSize: '18px',
            textTransform: 'none',
            transition: 'all 0.2s ease-in',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          Add {page === 'education' ? 'Education' : 'Work Experience'}
        </Button>

        {/* Modal for adding/editing data */}
        <Modal open={open} onClose={handleClose} 
        sx={
          {
            backgroundBlendMode: 'darken',
          }
        }
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: theme === 'dark' ? '#131313' : 'white',
              boxShadow: 24,
              p: 6,
              borderRadius: '25px',
              border: theme === 'dark' ? '2px solid white' : '2px solid black',
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
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  scale: 1.2,
                },
              }}
            >
              <Close />
            </IconButton>

            <Typography variant="h5" fontWeight="bold" mb={3} className={`  text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {isEditing ? `Edit ${page === 'education' ? 'Education' : 'Work Experience'}` : `Add ${page === 'education' ? 'Education' : 'Work Experience'}`}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexDirection="column" gap={3} sx={{ overflowY: 'auto' }}>
              {page === 'education' ? (
                <>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      Institution
                    </Typography>
                    <TextField
                      name="institution"
                      fullWidth
                      placeholder="Ex: Northwestern University"
                      value={newData.institution}
                      onChange={handleInputChange}
                      
                      InputProps={{
                        style: {
                          backgroundColor: theme !== 'dark' ? 'white' : 'black',
                          color: theme !== 'dark' ? 'black' : 'white',
                          outline : 'none',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      Degree (Optional)
                    </Typography>
                    <TextField
                      name="degree"
                      fullWidth
                      placeholder="Degree (Optional)"
                      value={newData.degree}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: theme !== 'dark' ? 'white' : 'black',
                          color: theme !== 'dark' ? 'black' : 'white',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      Field of Study (Optional)
                    </Typography>
                    <TextField
                      name="fieldOfStudy"
                      fullWidth
                      placeholder="Field of Study (Optional)"
                      value={newData.fieldOfStudy}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputProps={{
                        style: {
                          backgroundColor: theme !== 'dark' ? 'white' : 'black',
                          color: theme !== 'dark' ? 'black' : 'white',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      Company
                    </Typography>
                    <TextField
                      name="company"
                      fullWidth
                      placeholder="Ex: Google"
                      value={newData.company}
                      onChange={handleInputChange}
                      InputProps={{
                        style: {
                          backgroundColor: theme == 'dark' ? '#131313' : 'white',
                          color: theme !== 'dark' ? '' : 'white',
                          borderRadius: '8px',
                          
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      Position
                    </Typography>
                    <TextField
                      name="position"
                      fullWidth
                      placeholder="Position"
                      value={newData.position}
                      onChange={handleInputChange}
                      InputProps={{
                        style: {
                          backgroundColor: theme == 'dark' ? '#131313' : 'white',
                          color: theme !== 'dark' ? 'black' : 'white',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>
                </>
              )}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      From Date
                    </Typography>
                    <DatePicker
                      value={newData.from}
                      onChange={(newValue) => handleDateChange('from', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />
                      }
                      sx={{
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                      To Date
                    </Typography>
                    <DatePicker
                      value={newData.to}
                      onChange={(newValue) => handleDateChange('to', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      
                      sx={{
                      }}
                      className=''
                    />
                  </Box>
                </div>
              </LocalizationProvider>

              <Box>
                <Typography variant="body1" sx={{ mb: 1, color: theme === 'dark' ? '#fff' : '#333', fontWeight: '500' }}>
                  Description (Optional)
                </Typography>
                <TextField
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Add a description (Optional)"
                  value={newData.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputProps={{
                    style: {
                      backgroundColor: theme !== 'dark' ? 'white' : '#131313  ',
                      color: theme !== 'dark' ? 'black' : 'white',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>
            </Box>
              <div className=' text-center'>
                
            <Button
              variant="contained"
              onClick={handleSave}
              // Disable button if education or company is not provided
              disabled={ !newData.from}
              sx={{
                mt: 3,
                background: theme === 'dark' ? 'white' : 'black',
                padding: '10px 20px',
                borderRadius: '30px',
                textTransform: 'none',
                fontSize: '16px',
                transition: 'all 0.3s ease-in',
                '&:hover': {
                  transform: 'scale(1.05)',
                  background: theme === 'dark' ? 'white' : 'black',
                },
              }}
            >
              {isEditing ? `Update ${page === 'education' ? 'Education' : 'Work Experience'}` : `Add ${page === 'education' ? 'Education' : 'Work Experience'}`}
            </Button>
              </div>
          </Box>
        </Modal>
          <div className="flex mt-10 gap-6 w-full justify-end ">
          <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white  '} transition-all duration-300
            hover:scale-105
            `}
          >
            {
              editStep ? 'Next' : 'Close'
            }
          </button>
          { editStep &&( <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${theme == 'dark' ? 'bg-white text-black border-2 border-black' : 'bg-black text-white  '} transition-all duration-300\
            hover:scale-105
            `}
          >
            Skip
          </button>)}
          </div>
    </>
  );
};

export default Education;