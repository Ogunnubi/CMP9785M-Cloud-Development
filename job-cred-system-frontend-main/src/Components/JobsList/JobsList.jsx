import React from 'react'
import JobCard from '../JobCard/JobCard';

const JobsList = ({jobs}) => {

  if (!Array.isArray(jobs) || jobs.length === 0) {
      return (
      <div className="text-center py-2">
        <p className="text-gray-500">No jobs found</p>
      </div>
    );
  }



  return (
    <div className="py-3 mt-6">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobsList