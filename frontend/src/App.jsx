// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { pdfjs } from "react-pdf";
// // import PdfComp from "./PdfComp";
// // import '@fontsource/baloo-bhai-2';

// // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// //   "pdfjs-dist/build/pdf.worker.min.js",
// //   import.meta.url
// // ).toString();

// // function App() {
// //   const [title, setTitle] = useState("");
// //   const [file, setFile] = useState("");
// //   const [allImage, setAllImage] = useState(null);
// //   const [pdfFile, setPdfFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [editTitleId, setEditTitleId] = useState(null);

// //   useEffect(() => {
// //     getPdf();
// //   }, []);

// //   const getPdf = async () => {
// //     setLoading(true);
// //     try {
// //       const result = await axios.get("http://localhost:8000/get-files");
// //       setAllImage(result.data.data);
// //       setLoading(false);
// //     } catch (error) {
// //       setError("Error fetching PDF files");
// //       setLoading(false);
// //     }
// //   };

// //   const submitImage = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("file", file);

// //     try {
// //       const result = await axios.post(
// //         "http://localhost:8000/upload-files",
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         }
// //       );
// //       if (result.data.status === "ok") {
// //         alert("Uploaded Successfully!!!");
// //         getPdf();
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       setError("Error uploading PDF");
// //       setLoading(false);
// //     }
// //   };

// //   const showPdf = (pdf) => {
// //     setPdfFile(`http://localhost:8000/files/${pdf}`);
// //   };

// //   const handleEditTitle = async (id, newTitle) => {
// //     setLoading(true);
// //     try {
// //       const result = await axios.put(
// //         `http://localhost:8000/update-title/${id}`,
// //         { title: newTitle }
// //       );
// //       if (result.data.status === "ok") {
// //         alert("Title Updated Successfully!!!");
// //         setEditTitleId(null);
// //         getPdf();
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       setError("Error updating title");
// //       setLoading(false);
// //     }
// //   };

// //   const deletePdf = async (id) => {
// //     setLoading(true);
// //     try {
// //       const result = await axios.delete(
// //         `http://localhost:8000/delete-file/${id}`
// //       );
// //       if (result.data.status === "ok") {
// //         alert("PDF Deleted Successfully!!!");
// //         getPdf();
// //       }
// //       setLoading(false);
// //     } catch (error) {
// //       setError("Error deleting PDF");
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-cyan-500 min-h-screen p-8" >
// //       <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md" onSubmit={submitImage}>
// //         <h4 className="text-xl mb-4" style={{ fontFamily: 'Baloo Bhai 2, cursive' }}>Upload Pdf in React</h4>
// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             className="w-full p-2 border rounded"
// //             placeholder="Title"
// //             required
// //             onChange={(e) => setTitle(e.target.value)}
// //           />
// //         </div>
// //         <div className="mb-4">

// //           <input
// //             type="file"
// //             className="w-full p-2 border rounded"
// //             accept="application/pdf"
// //             required
// //             onChange={(e) => setFile(e.target.files[0])}
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">
// //             Submit
// //           </button>
// //         </div>
// //       </form>

// //       {loading && <p className="text-center mt-4">Loading...</p>}
// //       {error && <p className="text-center mt-4 text-red-500">{error}</p>}

// //       {/* <div className="mt-8">
// //         <h4 className="text-xl mb-4">Uploaded PDF:</h4>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {allImage == null
// //             ? ""
// //             : allImage.map((data) => {
// //               return (
// //                 <div key={data._id} className="bg-white rounded shadow-md p-4">
// //                   <h6 className="text-lg mb-2">Title: {data.title}</h6>
// //                   <button
// //                     className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
// //                     onClick={() => showPdf(data.pdf)}
// //                   >
// //                     Show Pdf
// //                   </button>
// //                 </div>
// //               );
// //             })}
// //         </div>
// //       </div> */}
// //       <div className="mt-8">
// //         <h4 className="text-xl mb-4">Uploaded PDF:</h4>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {allImage == null
// //             ? ""
// //             : allImage.map((data) => {
// //               return (
// //                 <div key={data._id} className="bg-white rounded shadow-md p-4 flex flex-col">
// //                   <div className="flex justify-between items-center mb-2">
// //                     {editTitleId === data._id ? (
// //                       <input
// //                         type="text"
// //                         className="w-full p-2 border rounded"
// //                         defaultValue={data.title}
// //                         onChange={(e) => setTitle(e.target.value)}
// //                       />
// //                     ) : (
// //                       <h6 className="text-lg">Title: {data.title}</h6>
// //                     )}
// //                     <div>
// //                       {editTitleId === data._id ? (
// //                         <button
// //                           className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mr-2"
// //                           onClick={() => handleEditTitle(data._id, title)}
// //                         >
// //                           Save
// //                         </button>
// //                       ) : (
// //                         <button
// //                           className="bg-green-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2"
// //                           onClick={() => setEditTitleId(data._id)}
// //                         >
// //                           Edit Name
// //                         </button>
// //                       )}
// //                       <button
// //                         className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
// //                         onClick={() => deletePdf(data._id)}
// //                       >
// //                         Delete PDF
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <button
// //                     className="bg-blue-500 text-white rounded px-4 py-2 mt-auto hover:bg-blue-600"
// //                     onClick={() => showPdf(data.pdf)}
// //                   >
// //                     Show Pdf
// //                   </button>
// //                 </div>
// //               );
// //             })}
// //         </div>
// //       </div>

// //       <PdfComp pdfFile={pdfFile} />
// //     </div>
// //   );
// // }
// // export default App;




// // App.js
// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import Uploadpdf from "./components/Upload";
// import Speech from "./components/SpeechtoTextviceVersaandMore";
// import Signup from "./components/Signup"
// import Login from './components/Login';
// // import TextToSpeech from "./TextToSpeech";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Uploadpdf />} />
//       <Route path="/speech" element={<Speech />} />
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/signup" element={<Signup />} />
//       {/* <Route path="/text-to-speech" element={<TextToSpeech />} /> */}
//       {/* Add other routes here */}
//     </Routes>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/Navbar';  // Import the Navbar component
// import Uploadpdf from "./components/Upload";
// import Speech from "./components/SpeechtoTextviceVersaandMore";
// import Signup from "./components/Signup";
// import Login from './components/Login';
// import NotFound from './components/NotFound';  // Import the 404 error page
// import { useAuthContext } from '../Context/AuthContext';

// function App() {
//   const { authUser } = useAuthContext();

//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={authUser ? <Navigate to="/speech" /> : <Navigate to="/login" />} />
//         <Route path="/speech" element={authUser ? <Speech /> : <Navigate to="/login" />} />
//         <Route path="/upload" element={authUser ? <Uploadpdf /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
//         <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />

//         {/* 404 Error Page */}
//         <Route path="*" element={<NotFound />} />

//       </Routes>
//       <ToastContainer />
//     </div>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "react-hot-toast"
import Navbar from './components/Navbar';
import Uploadpdf from "./components/Upload";
import Speech from "./components/SpeechtoTextviceVersaandMore";
import Signup from "./components/Signup";
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Import the Dashboard component
import NotFound from './components/NotFound';
import Home from "./components/Home"
import Room from "./components//Room"
import Chatbot from "./components/chatbot"
import FAQ from "./components/FAQ"
import { useAuthContext } from '../Context/AuthContext';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-screen">
      <Navbar />

      <div className="flex-grow p-4 overflow-y-auto">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={authUser ? <Navigate to="/speech" /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/speech" element={authUser ? <Speech /> : <Navigate to="/login" />} />
          <Route path="/upload" element={authUser ? <Uploadpdf /> : <Navigate to="/login" />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/chatbot" element={<Chatbot/>} />
          <Route path="/about" element={<FAQ />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}


export default App;
