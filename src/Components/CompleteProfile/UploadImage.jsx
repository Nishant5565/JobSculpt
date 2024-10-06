import React, { useContext, useState } from 'react';
import EditPhotoModal from "../../DashBaord/EditPhotoModal";
import { ThemeContext } from "../../Pages/ThemeContext";
import { Avatar, Skeleton, Box, Typography, Button, IconButton } from "@mui/material";
import { CloudUpload } from '@mui/icons-material';
import { updateProfileCompleteStatus } from '../../Functions/CompleteProfile';

const UploadImage = ({ user, setStep }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);


  const handleNext = () => {
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
    <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#f5f5f5]'} rounded-[25px] p-6 min-h-screen flex items-center justify-center`}>
      <div className={`${theme === 'dark' ? 'bg-[#222222]' : 'bg-white'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>
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
            <Avatar
              src={previewImage || user?.profileImage}
              alt={user?.name}
              sx={{
                width: 120,
                height: 120,
                cursor: "pointer",
                border: `4px solid ${theme === 'dark' ? 'white' : 'gray'}`,
                transition: '0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={handleOpen}
            />
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
        background: 'linear-gradient(90deg, #6A5ACD 0%, #7B68EE 100%)',
        padding: '10px 30px',
        color: 'white',
        '&:hover': {
          backgroundColor: '#5B4FC5',
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
          <div className="flex justify-center mt-10">
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-full text-white text-lg bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            Next
          </button>
          </div>
      </div>
    </div>
  );
};

export default UploadImage;
