import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './BalooBhaiFont.css';  // Import the Baloo Bhai font CSS file

// 

import useSignup from "../../hooks/useSignup"
const Signup = () => {
    // State hooks for form inputs
    const [inputs, setinputs] = useState({
        username: "",
        email: "",
        universityname:"",
        dob: "",
        password: "",
        cpassword: "",
    });
    // const handleCheckboxChange = (gender) => {
    //     setinputs({ ...inputs, gender })
    // }
    // Destructuring form data for easier access
    const { username, email, universityname, dob, password, cpassword } =
        inputs;
        const navigate=useNavigate();
    const { loading, signup } = useSignup();
    // Change handler for form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputs({
            ...inputs,
            [name]: value,
        });
    };

    // Handle signup form submission
    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await signup(inputs);
        if (result) {
            // toast.success("Signup successful!");
            navigate("/login");
        }
    };


    return (
        // <div className="flex justify-center items-center min-h-screen">
        //     <form
        //         onSubmit={handleSignup}
        //         className="flex w-[30rem] flex-col space-y-10"
        //     >
        //         <div className="text-center text-4xl font-medium flex-col">
        //             <i className="fas fa-user"></i> Register
        //         </div>
        //         <div
        //             className="w-full transform border-b-2  text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-user mr-2" style={{ fontSize: '24px', color: 'green' }}></i>
        //             <input
        //                 type="text"
        //                 name="username"
        //                 placeholder="Username"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 value={username}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div
        //             className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-envelope mr-2" style={{ fontSize: '24px', color: 'red' }}></i>
        //             <input
        //                 type="email"
        //                 name="email"
        //                 placeholder="Email"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 value={email}
        //                 onChange={handleChange}
        //             />
        //         </div>

        //         <div
        //             className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-calendar-alt mr-2" style={{ fontSize: '24px', color: 'cyan' }}></i>
        //             <input
        //                 type="date"
        //                 name="dob"
        //                 placeholder="Date of Birth"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 max={new Date().toISOString().split("T")[0]}
        //                 // Set maximum date to today
        //                 value={dob}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div
        //             className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
        //             <input
        //                 type="text"
        //                 name="universityname"
        //                 placeholder="Studying"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 value={universityname}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <div
        //             className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 placeholder="Password"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 value={password}
        //                 onChange={handleChange}
        //             />
        //         </div>
                
        //         <div
        //             className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 flex items-center text-blue-500"
        //             style={{ fontFamily: "Baloo Bhai" }}
        //         >
        //             <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
        //             <input
        //                 type="password"
        //                 name="cpassword"
        //                 placeholder="Confirm Password"
        //                 className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none placeholder:text-black"
        //                 value={cpassword}
        //                 onChange={handleChange}
        //             />
        //         </div>
        //         <button
        //             type="submit"
        //             className="transform rounded-sm bg-blue-600 py-2 font-bold duration-300 hover:bg-green-400"
        //         >
        //             <i className="fas fa-user-plus"></i> REGISTER
        //         </button>
        //         <Link to="/login"
        //             className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 mx-auto"
        //         >
        //             Switch to Login
        //         </Link>
        //     </form>
        // </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
            <form onSubmit={handleSignup} className="flex w-[30rem] flex-col space-y-10 p-6 rounded-lg shadow-md bg-gray-100">
                <div className="text-center text-4xl font-medium flex-col">
                    <i className="fas fa-user"></i> Register
                </div>
                <div className="flex">
                    <i className="fas fa-user mr-2" style={{ fontSize: '24px', color: 'green' }}></i>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <i className="fas fa-envelope mr-2" style={{ fontSize: '24px', color: 'red' }}></i>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <i className="fas fa-calendar-alt mr-2" style={{ fontSize: '24px', color: 'cyan' }}></i>
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        max={new Date().toISOString().split("T")[0]}
                        value={dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <i className="fas fa-university mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                    <input
                        type="text"
                        name="universityname"
                        placeholder="Studying"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        value={universityname}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex">
                    <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                    <input
                        type="password"
                        name="cpassword"
                        placeholder="Confirm Password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                        value={cpassword}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="transform rounded-sm bg-blue-600 py-2 font-bold duration-300 hover:bg-green-400"
                >
                    <i className="fas fa-user-plus"></i> REGISTER
                </button>
                <Link to="/login" className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 mx-auto">
                    Switch to Login
                </Link>
            </form>
        </div>
    );
};

export default Signup;
