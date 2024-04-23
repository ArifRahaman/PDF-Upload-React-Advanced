// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Home = () => {
//     const [roomCode, setRoomCode] = useState("");
//     const navigate = useNavigate();

//     const callHomepage = async () => {
//         try {
//             const res = await fetch("http://localhost:8000/home", {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include",
//             });
//             const data = await res.json();
//             console.log(data);

//             if (res.status !== 200) {
//                 throw new Error(res.statusText);
//             }
//         } catch (err) {
//             console.error("Error:", err.message);
//             navigate("/login");
//         }
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         navigate(`/room/${roomCode}`);
//     };

//     useEffect(() => {
//         callHomepage();
//     }, []);

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded shadow-lg">
//                 <h2 className="text-lg font-bold mb-4">Enter the room number</h2>
//                 <form onSubmit={handleFormSubmit}>
//                     <input
//                         type="text"
//                         value={roomCode}
//                         onChange={(e) => setRoomCode(e.target.value)}
//                         placeholder="Room Code"
//                         className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
//                     >
//                         Enter
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [roomCode, setRoomCode] = useState(generateRoomCode());
    const navigate = useNavigate();

    // Function to generate a random 12-character alphanumeric room code
    function generateRoomCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const length = 12;
        let code = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate(`/room/${roomCode}`);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Enter the room number</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={roomCode}
                        readOnly // Make the input read-only since it's generated
                        placeholder="Room Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;


