import React, { useEffect, useState } from "react";
import { Container, Grid, Skeleton, Modal, Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import CurrentDevices from "./CurrentDevices";
import RecentJobs from "./RecentJobs";
import EditPhotoModal from "./EditPhotoModal";
import ProfileSection from "./ProfileSection.jsx";
import api_call from '../Functions/api_call';
import { useNavigate } from "react-router-dom";

const HomeSection = ({ theme, user }) => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, isLoading] = useState(false);
  const { authuser } = api_call();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
    setSelectedFile(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const openModalFunction = (modal) => {  
    setOpenModal(true);

    if(modal === 'Device'){
      setModalType('Device');
    }
  }

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
    <Container maxWidth="xl" className="themeTransition">
      <Grid container spacing={3}>
        <div className="flex flex-row w-full gap-10">
          <div className=" w-2/3">
            <div
              style={{
                padding: "20px",
                flexDirection: "column",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                position: "relative",
                backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
              }}
              className="themeTransition"
            >
              {loading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <ProfileSection user={user} theme={theme} handleOpen={handleOpen} size={150} />
              )}
            </div>
          </div>
          <div className=" w-1/3">
            <div
              style={{
                padding: ' 5px',
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                // background: "linear-gradient(135deg, #ff7e5f 0%, #f7b 100%)",
                background: theme === "dark" ? "#1f1f1f" : "",
                color: "#fff",
                
              }}
            >
              <div className={` rounded-[15px] min-w-full min-h-[190px] flex flex-col justify-center items-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} themeTransition`}>
                <div className="">
                  <button className={`px-10 py-3 rounded-[10px] ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white border-white border-2 hover:bg-white hover:text-black '} transition-all duration-300 hover:scale-105`} onClick={() => openModalFunction('Device')}>
                    Manage Your Devices
                  </button>
                </div>
              </div>  
            </div>
          </div>
        </div>
        <Grid item xs={12}>
          <RecentJobs user={user} />
        </Grid>
      </Grid>

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

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box
          sx={{
            position: 'absolute',
            height: '90vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme === 'dark' ? '#131313' : 'white',
            color : theme === "dark" ? "#fff" : "#333",
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

        {modalType === 'Device' ? <CurrentDevices theme={theme} user={user} /> : <></>}

        <div className="flex justify-end mt-5">
        <button   className={`px-10 py-3 rounded-full ${theme !== 'dark' ? 'bg-white text-black hover:bg-black hover:text-white border-2 border-black' : 'bg-black text-white border-white border-2 hover:bg-white hover:text-black '} transition-all duration-300 hover:scale-105`}onClick={() => setOpenModal(false)}>
            Close
          </button>
        </div>
        </Box>
      </Modal>
    </Container>
  );
};

export default HomeSection;