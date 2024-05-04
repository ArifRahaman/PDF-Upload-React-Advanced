
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../Context/AuthContext'; // Adjust the path to your AuthContext
import { toast } from 'react-toastify';
import  axios from "axios";
import { FaFacebook, FaLinkedin, FaClipboard, FaPen,FaPlus,FaTrash } from 'react-icons/fa';
const Dashboard = () => {
    const [facebookLink, setFacebookLink] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [leetcodeLink, setLeetcodeLink] = useState("");
    const [customLink, setCustomLink] = useState("");

    useEffect(() => {
        // Fetch data from localStorage on component mount
        const storedFacebookLink = localStorage.getItem("facebook");
        const storedLinkedinLink = localStorage.getItem("linkedin");
        const storedLeetcodeLink = localStorage.getItem("leetcode");
        const storedCustomLink = localStorage.getItem("custom");

        if (storedFacebookLink) setFacebookLink(storedFacebookLink);
        if (storedLinkedinLink) setLinkedinLink(storedLinkedinLink);
        if (storedLeetcodeLink) setLeetcodeLink(storedLeetcodeLink);
        if (storedCustomLink) setCustomLink(storedCustomLink);
    }, []);

    const handleFacebookChange = (e) => {
        const link = e.target.value;
        setFacebookLink(link);
        localStorage.setItem("facebook", link); // Store link in localStorage
    };

    const handleLinkedinChange = (e) => {
        const link = e.target.value;
        setLinkedinLink(link);
        localStorage.setItem("linkedin", link); // Store link in localStorage
    };

    const handleLeetcodeChange = (e) => {
        const link = e.target.value;
        setLeetcodeLink(link);
        localStorage.setItem("leetcode", link); // Store link in localStorage
    };

    const handleCustomLinkChange = (e) => {
        const link = e.target.value;
        setCustomLink(link);
        localStorage.setItem("custom", link); // Store link in localStorage
    };

    // const handleIconClick = (link) => {
    //     window.open(link, "_blank");
    // };
    const [linkSections, setLinkSections] = useState([]);

    useEffect(() => {
        const storedLinks = JSON.parse(localStorage.getItem("links"));
        if (storedLinks) {
            setLinkSections(storedLinks);
        }
    }, []);

    const handleLinkChange = (e, id) => {
        const updatedLinks = linkSections.map(section => {
            if (section.id === id) {
                return { ...section, link: e.target.value };
            }
            return section;
        });
        setLinkSections(updatedLinks);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
    };

    const handleAddSection = () => {
        const newId = linkSections.length > 0 ? linkSections[linkSections.length - 1].id + 1 : 1;
        setLinkSections([...linkSections, { id: newId, link: "", label: "Custom Link" }]);
    };

    const handleRemoveSection = (id) => {
        const updatedLinks = linkSections.filter(section => section.id !== id);
        setLinkSections(updatedLinks);
        localStorage.setItem("links", JSON.stringify(updatedLinks));
    };

    const handleIconClick = (link) => {
        window.open(link, "_blank");
    };


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
 <div className="container mx-auto mt-10 bg-gradient-to-br from-gray-300 to-blue-900">
            <h1 className="text-3xl font-bold mb-8 text-center">User Dashboard</h1>
            <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Display uploaded image if available */}
                {uploadedImage && (
                    <div className="flex flex-col items-center justify-center group">
                        <img
                            src={uploadedImage}
                            alt="Uploaded Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-transparent transition-transform duration-300 transform group-hover:scale-110"
                        />
                        <div className="mt-4">
                            <label
                                htmlFor="fileInput"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition-transform duration-300 transform group-hover:scale-110"
                            >
                                Select Image
                            </label>
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>
                )}
                {/* Upload button */}
                <div className="flex items-center justify-center group">
                    <button
                        onClick={handleUpload}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-transform duration-300 transform group-hover:scale-110"
                    >
                        Upload Profile Picture
                    </button>
                </div>
            </div>
            {userData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
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
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded transition-transform duration-300 transform hover:scale-110"
                                        onClick={() => handleSubmit(key)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white p-2 rounded ml-2 transition-transform duration-300 transform hover:scale-110"
                                        onClick={() => handleCancel(key)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <span className="text-gray-800">{userData[key]}</span>
                                    <button
                                        className="ml-2 transition-transform duration-300 transform hover:scale-110"
                                        onClick={() => handleEdit(key)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

    
            ) : (
                <p className="text-center mt-8">Loading...</p>
            )}
            <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Facebook Section */}
                <div className="flex flex-col items-center justify-center group">
                    <FaFacebook className="text-blue-600 text-6xl mb-4 cursor-pointer" onClick={() => handleIconClick(facebookLink)} />
                    <input
                        type="text"
                        value={facebookLink}
                        onChange={handleFacebookChange}
                        placeholder="Enter Facebook Profile Link"
                        className="border border-gray-400 rounded p-2 w-64 text-center"
                    />
                </div>
                {/* LinkedIn Section */}
                <div className="flex flex-col items-center justify-center group">
                    <FaLinkedin className="text-blue-600 text-6xl mb-4 cursor-pointer" onClick={() => handleIconClick(linkedinLink)} />
                    <input
                        type="text"
                        value={linkedinLink}
                        onChange={handleLinkedinChange}
                        placeholder="Enter LinkedIn Profile Link"
                        className="border border-gray-400 rounded p-2 w-64 text-center"
                    />
                </div>
                {/* LeetCode Section */}
                <div className="flex flex-col items-center justify-center group">
                    <FaClipboard className="text-blue-600 text-6xl mb-4 cursor-pointer" onClick={() => handleIconClick(leetcodeLink)} />
                    <input
                        type="text"
                        value={leetcodeLink}
                        onChange={handleLeetcodeChange}
                        placeholder="Enter LeetCode Profile Link"
                        className="border border-gray-400 rounded p-2 w-64 text-center"
                    />
                </div>
                {/* Custom Link Section */}
                <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Render link sections */}
                    {linkSections.map(section => (
                        <div key={section.id} className="flex flex-col items-center justify-center group">
                            <FaTrash className="text-red-600 text-2xl mb-2 cursor-pointer" onClick={() => handleRemoveSection(section.id)} />
                            <input
                                type="text"
                                value={section.link}
                                onChange={(e) => handleLinkChange(e, section.id)}
                                placeholder={`Enter ${section.label} Link`}
                                className="border border-gray-400 rounded p-2 w-64 text-center"
                            />
                            <FaPlus className="text-blue-600 text-6xl mb-4 cursor-pointer" onClick={() => handleIconClick(section.link)} />
                        </div>
                    ))}
                    {/* Add new section button */}
                    <div className="flex flex-col items-center justify-center group">
                        <FaPlus className="text-blue-600 text-6xl mb-4 cursor-pointer" onClick={handleAddSection} />
                    </div>
                </div>
            </div>
            </div>


    

    );
};


export default Dashboard;
