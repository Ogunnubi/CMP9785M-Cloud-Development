import {useEffect, useState} from 'react'
import { useAuth } from '../../context/AuthContext';
import JobsList from '../JobsList/JobsList';
import "./Indeed.css";
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';


const Indeed = () => {

  const axiosPrivate = useAxiosPrivate();


  const { 
    setError, 
    jobs, 
    setJobs, 
    currentUser
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {


    let isMounted = true;
    const controller = new AbortController();

    const loadJobs = async () => {
      try {
        setIsLoading(true);

        const response = await axiosPrivate.get('/jobs');

        console.log("Jobs response:", response.data);

        if (response.data && isMounted) {
          setJobs(response.data);
        }

      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
      controller.abort();
    };

  }, []);


  


    
  return (

    <section className="section">
      <div className="container">
        <div className="credits__notif d-flex justify-content-between align-items-center flex-wrap mt-0 mb-5">
          <h5 className='fw-bold'>Credits</h5>
          <div className="alert alert-info mb-4 credits__notif__text" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            Current Balance: {currentUser?.credits} credits
            {currentUser?.credits < 10 && ( 
              <Link to="/credits" className="credits__notif__text__link d-block">
                Top Up
              </Link>
            )}
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          
          <div className="col-lg-9">
            {isLoading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <JobsList jobs={jobs} />
              )}
          </div>       

        </div>
      </div>
    </section>
  )
}

export default Indeed