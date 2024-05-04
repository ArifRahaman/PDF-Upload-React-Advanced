import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaDiscord, FaEnvelope } from 'react-icons/fa';

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`http://localhost:5173/room/${roomCode}`);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Room number</h2>
                <div className="flex mb-4">
                    <input
                        type="text"
                        value={roomCode}
                        readOnly
                        placeholder="Room Code"
                        className="w-full px-4 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
                        onClick={copyToClipboard} // Trigger copy function on click
                    />
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Copy
                    </button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4"
                    >
                        Enter
                    </button>
                </form>
                <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Share via:</span>
                    <FaWhatsapp
                        className="text-green-500 cursor-pointer mr-2"
                        onClick={() => {
                            window.open(`https://wa.me/?text=Join%20the%20room%20using%20this%20link:%20http://localhost:5173/room/${roomCode}`);
                        }}
                        style={{ fontSize: "24px" }} // Set icon size
                    />
                    <FaFacebook
                        className="text-blue-500 cursor-pointer mr-2"
                        onClick={() => {
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/room/${roomCode}`);
                        }}
                        style={{ fontSize: "24px" }} // Set icon size
                    />
                    <FaDiscord
                        className="text-purple-500 cursor-pointer mr-2"
                        onClick={() => {
                            window.open(`https://discord.com/channels/CHANNEL_ID`);
                        }}
                        style={{ fontSize: "24px" }} // Set icon size
                    />
                    <FaEnvelope
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                            window.open(`mailto:?subject=Join%20the%20room&body=Join%20the%20room%20using%20this%20link:%20http://localhost:5173/room/${roomCode}`);
                        }}
                        style={{ fontSize: "24px" }} // Set icon size
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
