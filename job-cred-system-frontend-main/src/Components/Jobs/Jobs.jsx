import {useState} from 'react'
import "./Jobs.css"
import { useAuth } from '../../context/AuthContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';


const Jobs = ({}) => {


    const axiosPrivate = useAxiosPrivate();
    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    const [jobCredit, setJobCredit] = useState(0)

    const {
        currentUser,
        setError,
        setJobs
    } = useAuth();

    const token = localStorage.getItem("authToken");
    const userId = currentUser?.accessToken ? jwtDecode(token)?.id : null;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const credits = parseInt(jobCredit);

        if (!userId) {
            setError('User ID is missing. Please log in again.');
            return;
        }
        
        
        if (isNaN(credits) || credits <= 0) {
            setError("Please enter a valid number of credits greater than zero.");
            return;
        }

        if (currentUser?.credits < 1) {
            setError("Insufficient credits to submit job.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            console.log(userId)
            
            const newJob = {
                title, 
                job_description: description, 
                credits_required: credits,
                posted_by: userId
            }

            
            const result = await axiosPrivate.post('/jobs', newJob)

            console.log("Job submission response:", result.data);

            if(result?.data) {

                toast.success("Job submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000
                });
                
                // Clear the form
                setTitle("");
                setJobCredit(0);
                setDescription("");
                
                setJobs((prevJobs) => [...prevJobs, result?.data]);

            }
        } catch (error) {
            
            toast.error(`${error?.response?.data?.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } finally {
            setLoading(false);
        }
    }



    return (

        <section className='section'>

            <div className="container">
                <div className="row justify-content-center">

                    <div className='intro__page mb-0'>
                        <h1 className='heading__one'>Submit Jobs with Credits</h1>
                        <p>A complete platform for managing job submissions with a credit-based system.</p>
                    </div>


                    <div className="col-lg-6">
                        <form className='row justify-content-center' onSubmit={handleSubmit}>

                        
                            {/* Job Title */}
                            <div className="mb-3 input-group">
                                <input 
                                type="text" 
                                className="form-control border-start-0 border-end-0" 
                                id="jobtitle" 
                                placeholder='Enter Job Title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>  

                            {/* Job Credits */}
                            <div className="mb-3 input-group">
                                <input 
                                type="number" 
                                min="1"
                                className="form-control border-start-0 border-end-0" 
                                id="jobtitle" 
                                placeholder='How much credits do you want to pay'
                                required
                                value={jobCredit || ""}
                                onChange={(e) => setJobCredit(e.target.value)}
                                />
                            </div>  

                            {/* Job Description */}
                            <div className="mb-3 input-group">
                                <textarea 
                                    required
                                    name="" 
                                    id="jobdescription" 
                                    className="form-control border-start-0 border-end-0 custom__textarea" 
                                    placeholder='Provide a description about the job'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div> 
                            
                            {/* button */}
                            <div className='col-12 text-center'>
                                <button 
                                    disabled={currentUser?.credits < jobCredit || loading}
                                    className='btn btn-brand'>
                                    {loading ? "Submitting..." : "Submit Job"}
                                </button>
                            </div>
                        </form>         
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Jobs