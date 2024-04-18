// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//     const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

//     return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
// };
// AuthContext.jsx

// import React, { createContext, useContext, useState } from "react";

// // Create the context
// export const AuthContext = createContext();

// // Custom hook to use the context
// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };

// // AuthContextProvider component
// export const AuthContextProvider = ({ children }) => {
//     // State to hold the authenticated user data
//     const [authUser, setAuthUser] = useState(null);

//     return (
//         <AuthContext.Provider value={{ authUser, setAuthUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};