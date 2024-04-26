// import { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import useLogin from "../../hooks/useLogin";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { loading, login } = useLogin();
//      const navigate=useNavigate();
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = await login(email, password);
//         if(data){
//             navigate("/")
//         }
//         // console.log(data.username);

//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//             <div className="w-full p-6 rounded-lg shadow-md bg-gray-100">
//                 <h1 className="text-3xl font-semibold text-center text-gray-800">
//                     Login<span className="text-blue-600"> Arif</span>
//                 </h1>

//                 <form onSubmit={handleSubmit} className="mt-4">
//                     <div className="mb-4">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 align-middle">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             placeholder="Enter email"
//                             className="w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter Password"
//                             className="w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <Link to="/signup" className="text-sm text-blue-600 hover:underline">
//                         Don't have an account?
//                     </Link>

//                     <button
//                         type="submit"
//                         className="w-1/3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
//                         disabled={loading}
//                     >
//                         {loading ? <span className="spinner"></span> : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(email, password);
        if (data) {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-md p-6 rounded-lg shadow-md bg-gray-100">
                <h1 className="text-3xl font-semibold text-center text-gray-800">
                    Login<span className="text-blue-600"> Arif</span>
                </h1>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/signup" className="block text-sm text-blue-600 hover:underline">
                        Don't have an account?
                    </Link>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner"></span> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;


