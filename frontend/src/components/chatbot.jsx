// // // import { useState } from "react";

// // // import axios from "axios";
// // // import ReactMarkdown from "react-markdown";

// // // function App() {
// // //     const [question, setQuestion] = useState("");
// // //     const [answer, setAnswer] = useState("");
// // //     const [generatingAnswer, setGeneratingAnswer] = useState(false);

// // //     async function generateAnswer(e) {
// // //         setGeneratingAnswer(true);
// // //         e.preventDefault();
// // //         setAnswer("Loading your answer... \n It might take upto 10 seconds :  ");
// // //         try {
// // //             const response = await axios({
// // //                 // url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
// // //                 //   import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
// // //                 // }`,
// // //                 url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA2aZKT68jpE0-yLVYxONr_Da_V6yF-eNc",
// // //                 method: "post",
// // //                 data: {
// // //                     contents: [{ parts: [{ text: question }] }],
// // //                 },
// // //             });

// // //             setAnswer(
// // //                 response["data"]["candidates"][0]["content"]["parts"][0]["text"]
// // //             );
// // //         } catch (error) {
// // //             console.log(error);
// // //             setAnswer("Sorry - Something went wrong. Please try again!");
// // //         }

// // //         setGeneratingAnswer(false);
// // //     }

// // //     return (
// // //         <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
// // //             <div className="bg-white rounded-lg p-8 shadow-md w-full md:w-2/3">
// // //                 <a
// // //                     href="https://github.com/Vishesh-Pandey/chat-ai"
// // //                     target="_blank"
// // //                     className="text-blue-600 font-bold text-3xl mb-6 block text-center"
// // //                 >
// // //                     Chat AI
// // //                 </a>
// // //                 <form onSubmit={generateAnswer} className="mb-6">
// // //                     <textarea
// // //                         required
// // //                         className="border rounded w-full p-3 resize-none"
// // //                         value={question}
// // //                         onChange={(e) => setQuestion(e.target.value)}
// // //                         placeholder="Ask anything"
// // //                     ></textarea>
// // //                     <button
// // //                         type="submit"
// // //                         className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600 transition-all duration-300"
// // //                         disabled={generatingAnswer}
// // //                     >
// // //                         {generatingAnswer ? "Generating..." : "Generate answer"}
// // //                     </button>
// // //                 </form>
// // //                 <div className="bg-green-300 rounded-lg p-4">
// // //                     {answer ? (
// // //                         <ReactMarkdown>{answer}</ReactMarkdown>
// // //                     ) : (
// // //                         <p className="text-blue-500 text-sm">No answer yet</p>
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }


import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import videoBackground from "./mp2.mp4"; // Replace "mp2.mp4" with the actual path to your video file
import Footer from "../components/Footer";
function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [error, setError] = useState("");

    async function generateAnswer(e) {
        setGeneratingAnswer(true);
        e.preventDefault();
        setAnswer("");
        setError("");

        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`, {
                contents: [{ parts: [{ text: question }] }],
            });

            setAnswer(response.data?.candidates[0]?.content?.parts[0]?.text || "No answer found.");
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.");
        }

        setGeneratingAnswer(false);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-800">
                <nav className="bg-gray-800 py-4">
                    {/* Your navbar content */}
                </nav>
                <div className="relative min-h-screen flex justify-center items-center">
                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
                        <source src={videoBackground} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                        <div className="bg-white rounded-lg p-8 shadow-md w-full max-w-xl md:max-w-2xl">
                            <a
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold text-3xl mb-6 block text-center"
                            >
                                Chat AI
                            </a>
                            <form onSubmit={generateAnswer} className="mb-6">
                                <textarea
                                    required
                                    className="border rounded w-full p-3 resize-none mb-4 h-10 md:h-48 lg:h-32"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Ask anything"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2 transition-all duration-300"
                                    disabled={generatingAnswer}
                                >
                                    {generatingAnswer ? "Generating..." : "Generate answer"}
                                </button>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </form>
                            <div className="bg-green-100 rounded-lg p-4 h-auto md:h-60 overflow-y-auto">
                                {generatingAnswer ? (
                                    <div className="flex justify-center items-center">
                                        <div className="spinner-border mr-2" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <p className="text-blue-500 text-sm">Generating answer...</p>
                                    </div>
                                ) : (
                                    <ReactMarkdown>{answer}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <Footer/>
        </>
    );
}

export default App;

