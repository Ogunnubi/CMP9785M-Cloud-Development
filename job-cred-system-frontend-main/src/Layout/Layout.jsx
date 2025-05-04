import Header from '../Components/Header/Header'
import { useAuth } from '../context/AuthContext';
import ChatAssistant from '../Components/ChatAssistant/ChatAssistant';



const Layout = ({children}) => {

  
  const { currentUser } = useAuth();
  // const token = localStorage.getItem("authToken");
  // const isAuthenticated = currentUser || token;
  const isAuthenticated = currentUser ? true : false;

  
  return (
    <main className='App'>
      <Header />
      {children}
      {isAuthenticated && <ChatAssistant />}
    </main>
  )
}

export default Layout