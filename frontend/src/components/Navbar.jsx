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
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Cookies from 'js-cookie';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; // Import the icons

const Navbar = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();

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

    return (
        <div className="flex">
            {/* Sidebar */}
            <nav className={`bg-gray-800 text-white w-64 p-4 ${sidebarVisible ? '' : 'hidden'}`}>
                <ul className="space-y-4 flex flex-col h-full">
                    <li>
                        <Link to="/speech" className="hover:bg-gray-700 px-3 py-2 rounded block">Speech</Link>
                    </li>
                    <li>
                        <Link to="/upload" className="hover:bg-gray-700 px-3 py-2 rounded block">Upload</Link>
                    </li>
                    {authUser ? (
                        <>
                            <li>
                                <Link to="/home" className="hover:bg-gray-700 px-3 py-2 rounded block">VideoConference</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded block">Dashboard</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/signup" className="hover:bg-gray-700 px-3 py-2 rounded block">Signup</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded block">Login</Link>
                            </li>
                        </>
                    )}
                    <li className=""> {/* Move the logout button to the bottom */}
                        <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded block">
                            <FaSignOutAlt className="mr-2 " /> Logout
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Icon Button to Toggle Sidebar */}
            <button onClick={toggleSidebar} className="bg-gray-800 text-white px-2 py-1 rounded ml-4">
                {sidebarVisible ? <FaTimes style={{ fontSize: '1rem' }} /> : <FaBars style={{ fontSize: '1rem' }} />}
            </button>

            {/* Page Content */}
            <div className="flex-grow p-4">
                {/* Content Goes Here */}
            </div>
        </div>
    );
};

export default Navbar;



