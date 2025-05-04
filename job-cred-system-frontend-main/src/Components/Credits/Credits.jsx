import {useEffect, useState} from 'react'
import "./Credits.css"
import { Plus, Minus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { toast } from 'react-toastify';

const Credits = () => {

  const axiosPrivate = useAxiosPrivate();

  const [userData, setUserData] = useState(null);
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const [creditsPackages, setCreditsPackages] = useState([]);
  const [customCredits, setCustomCredits] = useState(100);



  const {
    currentUser,
    setCurrentUser
  } = useAuth();
  
  



  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();


    const fetchCreditsData = async () => {
      try{
        setLoading(true);

        const response = await axiosPrivate.get('/credits/packages');

        console.log("credits response:", response.data);

        if (response.data && isMounted) {
          setCreditsPackages(response.data);
        }
      } catch (error) {
        console.error("Failed to load credits:", error);
        setError("Failed to load credits. Please try again later."); 
      }
    }

    fetchCreditsData();


    return () => {
      isMounted = false;
      controller.abort();
    };

  }, [])



  const handlePurchaseCredits = async (packageName) => {
    

    try {
      const {data} = await axiosPrivate.post('/credits/topup', { 
        package: packageName,
        payment_method: "stripe",
      });

      console.log("Purchase response:", {data})

      if (data) {

        setCurrentUser((prev) => ({
          ...prev,
          credits: data.credits_balance,
        }));

        toast.success(`You bought ${data.package} package`, {
          position: "top-right",
          autoClose: 3000
        });
        
      }

    } catch (error) {
      console.error("Failed to purchase credits:", error);
      
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } 
  }

 

  return (
    <section className='section'>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className='fw-bold'>Credits</h5>
            <div className="alert alert-info mb-4" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Current Balance: {currentUser.credits} credits
            </div>
          </div>

          <div className='intro__page mb-0'>
            <h3 className='heading__one'>Buy Credits</h3>
            <p>We have different offerings</p>
          </div>


          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
            {creditsPackages.map((pkg) => (
              <div className="col" key={pkg.name}>
                <div className="card pricing-card h-100 position-relative">
                  {pkg.popular && (
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill custom-badge">
                      Most Popular
                    </span>
                  )}
                  

                  <div className="custom-card-header">
                    <h5 className="custom-card-title">{pkg.name}</h5>
                    <p className="credits">{pkg.credits} credits</p>
                  </div>



                  <div className="price-container">
                    <p className="price">${pkg.usd}</p>
                    <p className="price-per-credit">${(pkg.usd / pkg.credits).toFixed(2)} per credit</p>
                  </div>

                  <button 
                    onClick={() => handlePurchaseCredits(pkg.name.toLowerCase())}
                    className="buy-button">
                    Buy Now
                  </button>

                  
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default Credits