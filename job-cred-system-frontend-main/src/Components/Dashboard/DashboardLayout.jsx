import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiCreditCard,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Credits', icon: FiCreditCard, path: '/credits' },
    { name: 'Jobs', icon: FiFileText, path: '/jobs' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <li className="nav-item">
        <Link className={`nav-link d-flex align-items-center ${isActive ? 'active text-white bg-primary' : ''}`} to={item.path}>
          <item.icon className="me-2" /> {item.name}
        </Link>
      </li>
    );
  };

  return (
    <div className="d-flex vh-100">
      <nav className="d-none d-md-block bg-light border-end" style={{ width: '250px' }}>
        <div className="text-center py-4 border-bottom">
          <h4>JobCredit</h4>
        </div>
        <ul className="nav flex-column px-3">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
          <li className="nav-item mt-4">
            <button className="btn btn-outline-danger w-100 d-flex align-items-center" onClick={handleLogout}>
              <FiLogOut className="me-2" /> Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex-grow-1 overflow-auto">
        <header className="d-flex justify-content-between align-items-center border-bottom px-4 py-2">
          <button 
            className="btn btn-outline-secondary d-md-none" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#mobileSidebar" 
            aria-controls="mobileSidebar"
          >
            <FiMenu />
          </button>
          <div className="d-flex align-items-center">
            <span className="me-2">{currentUser?.email}</span>
            <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }}>
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">JobCredit</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            <li className="nav-item mt-4">
              <button className="btn btn-outline-danger w-100 d-flex align-items-center" onClick={handleLogout}>
                <FiLogOut className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
