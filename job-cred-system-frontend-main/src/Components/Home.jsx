import {useState} from 'react'
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Home = () => {

    const [isLogin, setIsLogin] = useState(false)

    const toggleForm = () => {
        setIsLogin(prev => !prev);
    }

  return (
    <section className='section'>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <div className='intro__page'>
                        <h1 className='heading__one'>Submit Jobs with Credits</h1>
                        <p>A complete platform for managing job submissions with a credit-based system.</p>
                    </div>
                </div>

                <div className="col-lg-6 offset-lg-1 custom__mt">
                    {isLogin ? (
                        <Login toggleForm={toggleForm} />
                    ) : (
                        <Signup toggleForm={toggleForm} />
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home