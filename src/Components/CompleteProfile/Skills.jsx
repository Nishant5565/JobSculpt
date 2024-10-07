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
} from '@mui/material';
import { addSkill, deleteSkill, getAllSkills } from '../../Functions/CompleteProfile';

const Skills = ({ user, theme }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewSkill('');
  };

  const handleAddSkill = async (skill) => {
    if (!skill) return;

    try {
      await addSkill(skill);
      setUserSkills([...userSkills, skill]);
      setSnackbarMessage('Skill added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      handleCloseDialog();
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
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setSnackbarMessage('Error deleting skill!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const filteredSkills = allSkills
    .filter((skill) => skill.skill.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  return (
    <div className={`${theme === 'dark' ? 'bg-[#131313]' : 'bg-[#f5f5f5]'} rounded-[25px] p-6 min-h-screen flex items-center justify-center`}>
      <div className={`${theme === 'dark' ? 'bg-[#222222]' : 'bg-white'} container mx-auto max-w-4xl p-10 sm:p-20 rounded-3xl shadow-2xl transition-all duration-500`}>
        <TextField
          label="Search for skills"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {searchTerm && (
          <List sx={{ width: '100%', maxWidth: 500 }}>
            {filteredSkills.map((skill) => (
              <ListItem
                key={skill._id}
                sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => handleAddSkill(skill.skill)}
              >
                <ListItemText primary={skill.skill} />
              </ListItem>
            ))}
          </List>
        )}

        {/* Modal for adding a skill */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add a New Skill</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Skill"
              type="text"
              fullWidth
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleAddSkill(newSkill)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

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
      </div>
    </div>
  );
};

export default Skills;