// // Dashboard.jsx

// // Dashboard.jsx

// import React from 'react';
// import { useAuthContext } from '../../Context/AuthContext';

// const Dashboard = () => {
//     const { authUser } = useAuthContext();

//     return (
//         <div className="container mx-auto mt-10">
//             <h1 className="text-2xl mb-4">User Dashboard</h1>
//             <div>
//                 {authUser ? (
//                     <>
//                         <p><strong>Name:</strong> {authUser.name}</p>
//                         <p><strong>Email:</strong> {authUser.email}</p>
//                         {/* Add other user details here */}
//                     </>
//                 ) : (
//                     <p>Loading...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '../../Context/AuthContext';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const { authUser, setAuthUser } = useAuthContext();
//     const [userData, setUserData] = useState(null);
//     const [isEditing, setIsEditing] = useState({
//         username: false,
//         email: false,
//         dob: false,
//         universityname: false,
//     });
//     const [editData, setEditData] = useState({
//         username: '',
//         email: '',
//         dob: '',
//         universityname: '',
//     });

//     useEffect(() => {
//         if (authUser) {
//             setUserData(authUser);
//         }
//     }, [authUser]);

//     const handleEdit = (field) => {
//         setIsEditing({ ...isEditing, [field]: true });
//         setEditData({ ...editData, [field]: userData[field] });
//     };

//     const handleCancel = (field) => {
//         setIsEditing({ ...isEditing, [field]: false });
//         setEditData({ ...editData, [field]: userData[field] });
//     };

//     const handleChange = (e, field) => {
//         setEditData({ ...editData, [field]: e.target.value });
//     };

//     const handleSubmit = async (field) => {
//         try {
//             const res = await fetch(`http://localhost:8000/user/${userData._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ [field]: editData[field] }),
//             });

//             const data = await res.json();

//             if (!data || res.status !== 200) {
//                 throw new Error(data?.error || 'Failed to update');
//             }

//             setUserData({ ...userData, [field]: editData[field] });
//             setIsEditing({ ...isEditing, [field]: false });
//             toast.success('Successfully updated');
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     return (
//         <div className="container mx-auto mt-10">
//             <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//             {userData ? (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Name:</h2>
//                         {isEditing.username ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.username}
//                                     onChange={(e) => handleChange(e, 'username')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('username')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('username')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.username}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('username')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Email:</h2>
//                         {isEditing.email ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="email"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.email}
//                                     onChange={(e) => handleChange(e, 'email')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('email')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('email')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.email}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('email')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Date of Birth:</h2>
//                         {isEditing.dob ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="date"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.dob}
//                                     onChange={(e) => handleChange(e, 'dob')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('dob')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('dob')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.dob}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('dob')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">University Name:</h2>
//                         {isEditing.universityname ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.universityname}
//                                     onChange={(e) => handleChange(e, 'universityname')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('universityname')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('universityname')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.universityname}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('universityname')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '../../Context/AuthContext';
// import { toast } from 'react-toastify';

// // const Dashboard = () => {
// //     const { authUser, setAuthUser } = useAuthContext();
// //     const [userData, setUserData] = useState(null);
// //     const [isEditing, setIsEditing] = useState({
// //         // _id: false,
// //         username: false,
// //         email: false,
// //         dob: false,
// //         universityname: false,
// //     });
// //     const [editData, setEditData] = useState({
// //         // _id: "",
// //         username: '',
// //         email: '',
// //         dob: '',
// //         universityname: '',
// //     });

// //     useEffect(() => {
// //         if (authUser) {
// //             setUserData(authUser);
// //             console.log('Auth User Data:', authUser);  // Log the authUser object
// //             console.log('User Data:', userData);  // Log the userData object
// //         }
// //     }, [authUser, userData]);

// //     const handleEdit = (field) => {
// //         setIsEditing({ ...isEditing, [field]: true });
// //         setEditData({ ...editData, [field]: userData[field] });
// //     };

// //     const handleCancel = (field) => {
// //         setIsEditing({ ...isEditing, [field]: false });
// //         setEditData({ ...editData, [field]: userData[field] });
// //     };

// //     const handleChange = (e, field) => {
// //         setEditData({ ...editData, [field]: e.target.value });
// //     };

// //     // const handleSubmit = async (field) => {
// //     //     try {
// //     //         const res = await fetch(`http://localhost:8000/user/${userData.id}`, {
// //     //             method: 'PUT',
// //     //             headers: {
// //     //                 'Content-Type': 'application/json',
// //     //             },
// //     //             body: JSON.stringify({ [field]: editData[field] }),
// //     //         });

// //     //         const data = await res.json();

// //     //         if (!data || res.status !== 200) {
// //     //             throw new Error(data?.error || 'Failed to update');
// //     //         }

// //     //         setUserData(data);
// //     //         setIsEditing({ ...isEditing, [field]: false });
// //     //         toast.success('Successfully updated');
// //     //     } catch (error) {
// //     //         toast.error(error.message);
// //     //     }
// //     // };
// //     const handleSubmit = async (field) => {
// //         try {
// //             const res = await fetch(`http://localhost:8000/user/${userData.id}`, {
// //                 method: 'PUT',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ [field]: editData[field] }),
// //             });

// //             const data = await res.json();

// //             if (!data || res.status !== 200) {
// //                 throw new Error(data?.error || 'Failed to update');
// //             }

// //             console.log('Updated User Data:', data); // Log the updated data received from the API

// //             setUserData(data); // Update the state with the edited data
// //             setIsEditing({ ...isEditing, [field]: false });
// //             toast.success('Successfully updated');
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// const Dashboard = () => {
//     const { authUser } = useAuthContext();
//     const [userData, setUserData] = useState(null);
//     const [isEditing, setIsEditing] = useState({
//         username: false,
//         email: false,
//         dob: false,
//         universityname: false,
//     });
//     const [editData, setEditData] = useState({
//         username: '',
//         email: '',
//         dob: '',
//         universityname: '',
//     });

//     useEffect(() => {
//         if (authUser) {
//             setUserData(authUser);
//         }
//     }, [authUser]);

//     useEffect(() => {
//         console.log('User Data:', userData); // Log the updated userData here
//     }, [userData]);

//     const handleEdit = (field) => {
//         setIsEditing({ ...isEditing, [field]: true });
//         setEditData({ ...editData, [field]: userData[field] });
//     };

//     const handleCancel = (field) => {
//         setIsEditing({ ...isEditing, [field]: false });
//         setEditData({ ...editData, [field]: userData[field] });
//     };

//     const handleChange = (e, field) => {
//         setEditData({ ...editData, [field]: e.target.value });
//     };

//     const handleSubmit = async (field) => {
//         try {
//             const res = await fetch(`http://localhost:8000/user/${userData._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ [field]: editData[field] }),
//             });

//             const data = await res.json();

//             if (!data || res.status !== 200) {
//                 throw new Error(data?.error || 'Failed to update');
//             }

//             console.log('Updated User Data:', data); // Log the updated data received from the API

//             setUserData(data); // Update the state with the edited data
//             setIsEditing({ ...isEditing, [field]: false });
//             toast.success('Successfully updated');
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };


//     return (
//         <div className="container mx-auto mt-10">
//             <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//             {userData ? (
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Name:</h2>
//                         {isEditing.username ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.username}
//                                     onChange={(e) => handleChange(e, 'username')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('username')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('username')}>Cancel</button>
//                             </div>

//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.username}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('username')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Email:</h2>
//                         {isEditing.email ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="email"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.email}
//                                     onChange={(e) => handleChange(e, 'email')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('email')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('email')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.email}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('email')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">Date of Birth:</h2>
//                         {isEditing.dob ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="date"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.dob}
//                                     onChange={(e) => handleChange(e, 'dob')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('dob')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('dob')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.dob}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('dob')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="bg-white rounded-lg p-6 shadow-md relative">
//                         <h2 className="text-xl font-semibold mb-4">University Name:</h2>
//                         {isEditing.universityname ? (
//                             <div className="flex items-center">
//                                 <input
//                                     type="text"
//                                     className="border p-2 rounded mr-2 flex-grow"
//                                     value={editData.universityname}
//                                     onChange={(e) => handleChange(e, 'universityname')}
//                                 />
//                                 <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit('universityname')}>Save</button>
//                                 <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel('universityname')}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="flex items-center">
//                                 <span className="text-gray-600">{userData.universityname}</span>
//                                 <button className="ml-2" onClick={() => handleEdit('universityname')}>Edit</button>
//                             </div>
//                         )}
//                     </div>
//                     {/* <div>{userData._id}</div> */}
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../Context/AuthContext'; // Adjust the path to your AuthContext
import { toast } from 'react-toastify';
import  axios from "axios";

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { authUser } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const [uploadedImage, setUploadedImage] = useState("https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.867424154.1713484800&semt=ais"); // State to store uploaded image URL

    const [isEditing, setIsEditing] = useState({
        username: false,
        email: false,
        dob: false,
        universityname: false,
    });
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        dob: '',
        universityname: '',
    });
    useEffect(() => {
        // Fetch the uploaded image URL from local storage when the component mounts
        const storedImageUrl = localStorage.getItem('uploadedImageUrl');
        if (storedImageUrl) {
            setUploadedImage(storedImageUrl);
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount
    useEffect(() => {
        if (authUser) {
            setUserData(authUser);
        }
    }, [authUser]);

    useEffect(() => {
        console.log('User Data:', userData); // Log the updated userData here
    }, [userData]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
        setEditData({ ...editData, [field]: userData[field] });
    };

    const handleCancel = (field) => {
        setIsEditing({ ...isEditing, [field]: false });
        setEditData({ ...editData, [field]: userData[field] });
    };

    const handleChange = (e, field) => {
        setEditData({ ...editData, [field]: e.target.value });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        try {
            const response = await axios.post('http://localhost:8000/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server Response:', response.data); // Log the entire response for debugging
            if (response.data && response.data.imageUrl) {
                setUploadedImage(response.data.imageUrl); // Set the uploaded image URL in state
                alert('File uploaded successfully!');

                // Store the uploaded image URL in local storage
                localStorage.setItem('uploadedImageUrl', response.data.imageUrl);
            } else {
                console.error('Invalid server response:', response.data);
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
        }
    };



    const handleSubmit = async (field) => {
        try {
            const res = await fetch(`http://localhost:8000/user/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [field]: editData[field] }),
            });

            const data = await res.json();

            if (!data || res.status !== 200) {
                throw new Error(data?.error || 'Failed to update');
            }

            console.log('Updated User Data:', data); // Log the updated data received from the API

            // Update the localStorage
            const updatedUserData = { ...userData, [field]: editData[field] };
            localStorage.setItem('chat-user', JSON.stringify(updatedUserData));

            setUserData(updatedUserData); // Update the state with the edited data
            setIsEditing({ ...isEditing, [field]: false });
            toast.success('Successfully updated');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display uploaded image if available */}
                {uploadedImage && (
                    <div className="flex items-center justify-center">
                        <img src={uploadedImage} alt="Uploaded Profile" className="w-32 h-32 rounded-full object-cover" />
                        <div className="ml-4">
                            <label htmlFor="fileInput" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Select Image
                            </label>
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                )}
                {/* Upload button */}
                <div className="flex items-center justify-center">
                    <button onClick={handleUpload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Upload Profile Picture
                    </button>
                </div>
            </div>
            {userData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                    {/* Profile Details Cards */}
                    {Object.keys(userData).map((key) => (
                        <div key={key} className="bg-blue-200 rounded-lg p-6 shadow-md relative">
                            <h2 className="text-xl font-semibold mb-4">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
                            {isEditing[key] ? (
                                <div className="flex items-center">
                                    <input
                                        type={key === 'dob' ? 'date' : 'text'}
                                        className="border p-2 rounded mr-2 flex-grow"
                                        value={editData[key]}
                                        onChange={(e) => handleChange(e, key)}
                                    />
                                    <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleSubmit(key)}>Save</button>
                                    <button className="bg-gray-500 text-white p-2 rounded ml-2" onClick={() => handleCancel(key)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="text-gray-800">{userData[key]}</span>
                                    <button className="ml-2" onClick={() => handleEdit(key)}>Edit</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


export default Dashboard;
