import React, { useContext, useState } from 'react';
import EditPhotoModal from "../../DashBaord/EditPhotoModal";
import { ThemeContext } from "../../Pages/ThemeContext";
import { Avatar, Skeleton, Box, Typography, Button, IconButton } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';
import { updateProfileCompleteStatus } from '../../Functions/CompleteProfile';
import {Snackbar} from '@mui/material';
import { Alert } from '@mui/material';

const UploadImage = ({ user, setStep, editStep, setPreviewOpenModal }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');


  const handleNext = () => {
    if(!editStep){
      setPreviewOpenModal(false);
      return 
    }
      updateProfileCompleteStatus('UserDetail');
      setStep('UserDetail'); 
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
        <Box
          textAlign="center"
          mb={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={120} height={120} />
          ) : (
              <>
            {
              user?.profileImage =='NoImage'?(
              <Avatar
              src={previewImage || user?.profileImage}
              alt={user?.name}
              sx={{
                width: 120,
                height: 120,
                filter: theme === 'dark' ? 'invert(1)' : 'invert(1)',
                backgroundColor: theme === 'dark' ? 'white' : 'black',
                cursor: "pointer",
                border: `4px solid ${theme === 'dark' ? 'black' : 'white'}`,
              }}
              ></Avatar> ) : ( 
                <Avatar
                src={previewImage || user?.profileImage}
                alt={user?.name}
                sx={{
                  width: 120,
                  height: 120,
                  cursor: "pointer",
                  border: `2px solid ${theme !== 'dark' ? 'black' : 'white'}`,
                }}
                ></Avatar> 
                
               )
            }
              </>
          )}

          <Typography
            variant="h6"
            sx={{
              color: theme === 'dark' ? '#f5f5f5' : '#444',
              fontWeight: 'bold',
              mt: 2,
            }}
          >
          Select A Profile Picture
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme === 'dark' ? '#fff' : '#000',
              fontSize: '13px',
            }}
          >
            Personalize your profile by uploading your picture.
          </Typography>

          {/* Button to Open Modal */}
          <Box mt={3}>
          <Button
      variant="contained"
      color="primary"
      startIcon={<CloudUpload />}
      onClick={handleOpen}
      sx={{
        borderRadius: '25px',
        background: theme !== 'dark' ? 'black' : 'white',
        padding: '10px 30px',
        color: theme !== 'dark' ? 'white' : 'black',
        transition: '0.3s ease-in-out',

        '&:hover': {
          backgroundColor: theme == 'dark' ? 'black' : 'white',
          color: theme == 'dark' ? 'white' : 'black',
          transform: 'scale(1.05)',
        },
      }}
    >
      Upload Image
    </Button>
          </Box>
        </Box>

        <EditPhotoModal
          open={open}
          handleClose={handleClose}
          theme={theme}
          user={user}
          handleFileChange={handleFileChange}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          previewImage={previewImage}
          selectedFile={selectedFile}
          loading={loading}
        />
          <div className="flex justify-end w-full gap-10 mt-10">
          {
            editStep && (
              <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full hover:scale-105  ${theme != 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white hover:bg-white hover:text-black'} transition-all duration-300`}
          >
            Next
          </button>)
          }
          <button
            onClick={handleNext}
            className={`px-10 py-3 rounded-full ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white hover:bg-white hover:text-black '} transition-all duration-300\
            hover:scale-105
            `}
          >
            {
              editStep ? 'Skip' : 'Close'
            }
          </button>
          </div>
      </>
  );
};

export default UploadImage;
