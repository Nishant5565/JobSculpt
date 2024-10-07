import axios from 'axios';
import { API_URL } from './Constants';

export const changeRole = async (role) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/change-role',
      { role },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Role change failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Role change failed:', err);
    return err;
  }
};


export const updateProfileCompleteStatus = async (status) => {
     try {
     const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
     const response = await axios.post(
          API_URL + '/api/auth/update-profile-complete-status',
          { status },
          {
          headers: {
               'x-auth-token': token,
          },
          }
     );
     
     if (response.status !== 200) {
          console.error('Profile status update failed:', response.data);
          return;
     }
     } catch (err) {
     console.error('Profile status update failed:', err);
     return err;
     }
     }


    export const updateUserName = async (userName, name, about) => {

      try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post(
            API_URL + '/api/auth/update-username',
            { userName, name, about },
            {
            headers: {
                'x-auth-token': token,
            },
            }
      );
      
      if (response.status !== 200) {
            console.error('Username update failed:', response.data);
            return;
      }
      } catch (err) {
      console.error('Username update failed:', err);
      return err;
      }
      }

      export const updateEducation = async (education) => {
        try {
          const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
          const response = await axios.post(
            API_URL + '/api/auth/update-education',
            { education },
            {
              headers: {
                'x-auth-token': token,
              },
            }
          );
      
          if (response.status !== 200) {
            console.error('Education update failed:', response.data);
            return;
          }
        } catch (err) {
          console.error('Education update failed:', err);
          return err;
        }
      }
  
export const editEducation = async (education, index) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/edit-education',
      { education , index},
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Education edit failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Education edit failed:', err);
    return err;
  }
};

export const deleteEducation = async (index) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/delete-education',
      { index },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Education delete failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Education delete failed:', err);
    return err;
  }
};

export const updateWorkExperience = async (experience) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/update-work-experience',
      { experience },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Work experience update failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Work experience update failed:', err);
    return err;
  }
}

export const editWorkExperience = async (experience, index) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/edit-work-experience',
      { experience, index },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Work experience edit failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Work experience edit failed:', err);
    return err;
  }
};

export const deleteWorkExperience = async (index) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/delete-work-experience',
      { index },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Work experience delete failed:', response.data);
      return;
    }
  } catch (err) {
    console.error('Work experience delete failed:', err);
    return err;
  }
};

export const getAllSkills = async () => {
  try {
    const response = await axios.get(API_URL + '/api/jobsculpt/admin/auth/skills');
    if (response.status !== 200) {
      console.error('Error fetching skills:', response.data);
      return [];
    }
    return response.data;
  } catch (err) {
    console.error('Error fetching skills:', err);
    return [];
  }
};

export const getUserSkills = async () => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.get(API_URL + '/api/auth/user-skills', {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log(response);
    if (response.status !== 200) {
      console.error('Error fetching user skills:', response.data);
      return [];
    }

    return response.data;
  } catch (err) {
    console.error('Error fetching user skills:', err);
    return [];
  }
}

export const addSkill = async (skill) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/add-user-skill',
      { skill },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Error adding skill:', response.data);
      return;
    }
  } catch (err) {
    console.error('Error adding skill:', err);
    return err;
  }
}

export const deleteSkill = async (skill) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await axios.post(
      API_URL + '/api/auth/delete-user-skill',
      { skill },
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );

    if (response.status !== 200) {
      console.error('Error deleting skill:', response.data);
      return;
    }
  } catch (err) {
    console.error('Error deleting skill:', err);
    return err;
  }
}