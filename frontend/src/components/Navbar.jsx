// Navbar.jsx

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../Context/AuthContext';

// const Navbar = () => {
//     const { authUser, setAuthUser } = useAuthContext(); // Add setAuthUser to update authUser state
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // Clear localStorage
//         localStorage.clear();
//         // Cookies.remove('jwt');
//         // res.clearCookie('jwt', { path: '/' });
//         // res.clearCookie("jwtoken");
//         // Remove JWT token
//         localStorage.removeItem('user-chat');
        
//         // Update authUser state to null
//         setAuthUser(null);

//         // Navigate to login page
//         navigate('/login');
//     };

//     return (
//         <nav className="bg-gray-800 text-white p-4">
//             <ul className="flex justify-end space-x-4">
//                 <li>
//                     <Link to="/speech" className="hover:bg-gray-700 px-3 py-2 rounded">Speech</Link>
//                 </li>
//                 <li>
//                     <Link to="/upload" className="hover:bg-gray-700 px-3 py-2 rounded">Upload</Link>
//                 </li>
//                 {authUser ? (
//                     <li>
//                         <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
//                             Logout
//                         </button>
//                     </li>
//                 ) : (
//                     <>
//                         <li>
//                             <Link to="/signup" className="hover:bg-gray-700 px-3 py-2 rounded">Signup</Link>
//                         </li>
//                         <li>
//                             <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Cookies from 'js-cookie';
import { FaBars, FaTimes, FaSignOutAlt, FaMicrophone, FaUpload, FaRobot, FaVideo, FaUserCircle, FaUserPlus, FaSignInAlt, FaQuestion } from 'react-icons/fa';

const Navbar = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarVisible, setSidebarVisible] = useState(true);

    const handleLogout = () => {
        Cookies.remove('jwt');
        localStorage.clear();
        localStorage.removeItem('user-chat');
        localStorage.removeItem('uploadedImageUrl');
        setAuthUser(null);
        navigate('/login');
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const isVideoConference = location.pathname === '/home';
    const isRoom = location.pathname.startsWith('/room/');

    return (
        <header className={`bg-black text-white ${isVideoConference || isRoom ? 'hidden' : ''}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 w-32" alt="Flowbite Logo" />
                        </h1>
                    </div>
                    <button onClick={toggleSidebar} className="bg-gray-800 text-white px-2 py-1 rounded">
                        {sidebarVisible ? <FaTimes style={{ fontSize: '1rem' }} /> : <FaBars style={{ fontSize: '1rem' }} />}
                    </button>
                </div>
                <nav className={`bg-gradient-to-br from-red-400 to-gray-500 text-white w-64 p-4 ${sidebarVisible ? '' : 'hidden'}`}>
                    <ul className="space-y-4 flex flex-col h-full">
                        <li>
                            <Link to="/about" className={`px-3 py-2 rounded block flex items-center ${isActive('/about') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                <FaQuestion className="mr-2" />About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/speech" className={`px-3 py-2 rounded block flex items-center ${isActive('/speech') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                <FaMicrophone className="mr-2" /> Speech
                            </Link>
                        </li>
                        <li>
                            <Link to="/upload" className={`px-3 py-2 rounded block flex items-center ${isActive('/upload') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                <FaUpload className="mr-2" /> Upload
                            </Link>
                        </li>
                        <li>
                            <Link to="/chatbot" className={`px-3 py-2 rounded block flex items-center ${isActive('/chatbot') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                <FaRobot className="mr-2" /> Chatbot
                            </Link>
                        </li>
                        {authUser ? (
                            <>
                                <li>
                                    <Link to="/home" className={`px-3 py-2 rounded block flex items-center ${isActive('/home') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaVideo className="mr-2" /> VideoConference
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className={`px-3 py-2 rounded block flex items-center ${isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaUserCircle className="mr-2" /> Dashboard
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup" className={`px-3 py-2 rounded block flex items-center ${isActive('/signup') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaUserPlus className="mr-2" /> Signup
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className={`px-3 py-2 rounded block flex items-center ${isActive('/login') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
                                        <FaSignInAlt className="mr-2" /> Login
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded block flex items-center">
                                <FaSignOutAlt className="mr-2 " /> Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;




