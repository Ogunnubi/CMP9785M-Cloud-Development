import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../Hooks/useLogout";


const Header = () => {

  const { currentUser } = useAuth();

    //   const token = localStorage.getItem("authToken");
  const isAuthenticated = currentUser ? true : false;

    const navigate = useNavigate();

    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
        console.log('User logged out successfully');  
        navigate("/");
    };


    return (    
        <nav className="navbar bg-white slow py-4 navbar-expand-md sticky-top divider">
            <div className="container-fluid px-5">

                <span className="navbar-brand">
                    <h6>WeWork</h6>
                </span>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">          
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/jobs' className="nav-link">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/submit" className="nav-link">Create a Job</Link>
                        </li>
                    </ul>


                    {isAuthenticated && <button onClick={handleLogout} className="btn btn-brand ms-3">Logout</button>}

                </div>
            </div>
        </nav>
    )
}

export default Header