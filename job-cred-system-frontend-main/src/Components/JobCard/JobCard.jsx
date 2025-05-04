import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const JobCard = ({job}) => {

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const {
    currentUser,
    setError,
    setLoading,
    setCurrentUser,
  } = useAuth();


  
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      localStorage.removeItem("authToken");
    }
  }, [currentUser, navigate]);
  

  if (!currentUser) {
    return null;
  }

  
  const token = localStorage.getItem("authToken");
  const userData = currentUser?.accessToken ? jwtDecode(token) : null;

  const userId = userData?.id;
  const userCredits = currentUser?.credits || 0;

  
  const handleJobSubmission = async () => {
             
    
    const creditsRequired = parseInt(job.credits_required);

    if (!userId) {
      setError('User ID is missing. Please log in again.');
      return;
    }
    
    
    if (isNaN(creditsRequired) || creditsRequired <= 0) {
      setError("Please enter a valid number of credits greater than zero.");
      return;
    }

    if (userCredits < 1) {
      setError("Insufficient credits to submit job.");
      return;
    }
    
    try {
      setLoading(true);
      setError("");

      const {data} = await axiosPrivate.post(`/jobs/${job.id}/apply`, {
        proposal: job.job_description,
      });

      toast.success(`${data.message}`, {
        position: "top-right",
        autoClose: 3000
      });

      setCurrentUser((prev) => ({
        ...prev,
        credits: data.credits_balance,
      }));

      console.log("here", data);

    } catch (error) {

      toast.error(`${error?.response?.data?.detail}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      console.error("Error submitting job:", error);
    
    } finally {
      setLoading(false);
    }
  }


 


  return (
    <>
      <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h4 className="h5 fw-bold">{job.title}</h4>
          </div>
          <div className="col-md-4 text-md-end">
            <span className="text-success fw-bold">{job.credits_required} Credits</span>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-secondary">{job.job_description}</p>
        </div>

        <div className='mt-3 d-flex justify-content-between'>
          <span>Date Submitted</span>
          <span className='text-secondary'>{new Date(job.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="mt-3 pt-3 border-top">
          <div className="d-flex justify-content-between align-items-center">
            
            <button 
              onClick={handleJobSubmission}
              disabled={userCredits <= 0}
              className="btn btn-brand"
            >
              Apply
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export default JobCard