import { useAuth } from '../../context/AuthContext';
import handleLogin from '../../utils/handleLogin';
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"


const Login = ({toggleForm}) => {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
    

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { 
    setCurrentUser, 
    setLoading, 
    setError,
    setUserCredits,
    currentUser
  } = useAuth() 
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password, setError, setLoading, setCurrentUser, navigate, setUserCredits, currentUser, from);

      setEmail('');
      setPassword('');
      setLoginError("");
      setShowPassword(false);

    } catch (err) {
      setLoginError(`Failed to log in. Please check your credentials. ${err.message}`);
      console.error(`Failed to log in. Please check your credentials. ${err.message}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="row g-3 px-3">
      {loginError && <div className="alert alert-danger">{loginError}</div>}
      
      {/* email input */}
      <div className="mb-3 input-group">
        <span className="input-group-text bg-white border-end-0">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input 
          type="email" 
          className="form-control border-start-0 border-end-0" 
          id="emailInput" 
          placeholder='Enter your email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* password input */}
      <div className="mb-3 input-group">
        <input 
          type={showPassword ? "text" : "password"} 
          className="form-control border-start-0 border-end-0" 
          id="passwordInput" 
          required
          placeholder='Enter your password'
          value={password}
          autoComplete='off'
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="input-group-text border-start-0 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </span>
      </div>


      <button type="submit" className="btn btn-brand" style={{width: "100%"}}>Log in</button>
      

      <p className='text-center mt-3'>
        Don't have an account? <span className="toggle__link" onClick={toggleForm}>Create one</span>
      </p>
    </form>
  )
}

export default Login