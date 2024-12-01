import React, { useState, useEffect } from 'react';
import api_call from '../../Functions/api_call';
import JobCard from './JobCard';

const FindJobs = () => {
  const { authuser, fetchApi } = api_call();
  const [jobsBySkills, setJobsBySkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    authuser().then((data) => {
      if (data) {
        setUser(data);
        setUserSkills(data?.skills.map((skill) => skill.skill));

        const fetchJobsBySkills = async () => {
          const response = await fetchApi('/api/find-jobs', 'POST', { skills: data?.skills });
          if (response) {
            setJobsBySkills(response);
            setLoading(false);
          }
        };
        fetchJobsBySkills();
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
     <div className="p-6 gap-20 mt-20">
     <div className=' text-center w-full'>
     <h1 className="text-[50px] font-bold">Jobs for you</h1>
     <p className="text-gray-700">Jobs based on your skills</p>
     </div>
    <div className="p-6 flex justify-start gap-20 mt-20">
      {jobsBySkills && jobsBySkills.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
    </div>
  );
};

export default FindJobs;