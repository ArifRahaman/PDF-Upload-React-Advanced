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


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Cookies from 'js-cookie';
const Navbar = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('jwt');  
        localStorage.clear();
        localStorage.removeItem('user-chat');

        setAuthUser(null);
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex justify-end space-x-4">
                <li>
                    <Link to="/speech" className="hover:bg-gray-700 px-3 py-2 rounded">Speech</Link>
                </li>
                <li>
                    <Link to="/upload" className="hover:bg-gray-700 px-3 py-2 rounded">Upload</Link>
                </li>
                {authUser ? (
                    <>
                        <li>
                            <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</Link> {/* New Dashboard link */}
                        </li>
                        <li>
                            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup" className="hover:bg-gray-700 px-3 py-2 rounded">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
