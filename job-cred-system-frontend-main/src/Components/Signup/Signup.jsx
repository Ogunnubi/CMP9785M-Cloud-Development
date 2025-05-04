import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import handleSignup from '../../utils/handleSignup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons"



const Signup = ({toggleForm}) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [signupError, setSignupError] = useState("")

    const navigate = useNavigate();
    
    const { 
        setCurrentUser, 
        setLoading, 
        setError,
        setUserCredits,
    } = useAuth()



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSignup(email, password, username, setError, setLoading, setCurrentUser, navigate, confirmPassword, setUserCredits);

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSignupError("");
            setShowPassword(false);
            setShowConfirmPassword(false);

        } catch (err) {
            setSignupError(`Failed to sign up. Please check your credentials.`)
            console.error(`'Failed to sign up. Please check your credentials.' ${err.message}`);
        }
    };



  return (
    <form onSubmit={handleSubmit} action="row g-3 px-3">
        {signupError && <div className="alert alert-danger">{signupError}</div>}
        {/* username input */}
        <div className="input-group mb-3 custom-input-group">
            <span className="input-group-text bg-white border-end-0">
                <FontAwesomeIcon icon={faUser} />
            </span>
            <input
                required
                type="text"
                id="usernameInput"
                className="form-control border-start-0"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>

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


        {/* confirm password input */}
        <div className="mb-3 input-group">
            <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="form-control border-start-0 border-end-0" 
                id="confirmPasswordInput" 
                required
                placeholder='Confirm your password again'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
                className="input-group-text border-start-0 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </span>
        </div>


        <button 
            type="submit" 
            className="btn btn-brand" 
            style={{width: "100%"}}
        >
            Create Account
        </button>

        <p className='text-center mt-3'>
            Already have an account ? <span className="toggle__link" onClick={toggleForm}>Log In</span>
        </p>
    </form>
  )
}

export default Signup