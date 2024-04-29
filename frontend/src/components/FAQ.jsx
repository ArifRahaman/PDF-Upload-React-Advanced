import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FaRobot, FaVideo, FaChartLine, FaUpload, FaMicrophone, FaFilePdf } from 'react-icons/fa';
import emailjs from 'emailjs-com';
const AboutUs = () => {
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalPdf, setTotalPdfs] = useState(null);

    const fetchUserCount = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users/count");

            if (response.status !== 200) {
                throw new Error("Failed to fetch user count");
            }

            const data = response.data;
            setTotalUsers(data.total);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    useEffect(() => {
        fetchUserCount();
    }, []); // Run once on component mount
    const fetchPdfCount = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users/pdf");

            if (response.status !== 200) {
                throw new Error("Failed to fetch user count");
            }

            const data = response.data;
            setTotalPdfs(data.total);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    useEffect(() => {
        fetchPdfCount();
    }, []); // Run once on component mount


    const faqs = [
        {
            question: "Why cannot I able to access upload and meet?",
            answer: "You can schedule a medical appointment by logging into your patient portal or by calling our appointment hotline. Follow the provided instructions for a seamless booking process.",
        },
        {
            question: "What COVID-19 safety measures are in place?",
            answer: "Your health and safety are our top priorities. We have implemented strict COVID-19 safety protocols, including regular sanitization, social distancing measures, and virtual consultations when possible.",
        },
        {
            question: "How can I access my medical records?",
            answer: "You can access your medical records through our secure patient portal. Log in using your credentials, and you'll be able to view and download your medical history, test results, and other relevant information.",
        },
        {
            question: "What specialties do your healthcare professionals cover?",
            answer: "Our healthcare professionals cover a wide range of specialties, including but not limited to internal medicine, pediatrics, cardiology, dermatology, and more. Feel free to check our website or contact us for specific details about our medical staff.",
        },
        {
            question: "What should I bring to my first appointment?",
            answer: "For your first appointment, please bring a valid ID, insurance information, a list of current medications, and any relevant medical records. This will help us provide you with the best possible care.",
        },
        // Add more healthcare-related FAQ items as needed
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const features = [
        {
            icon: <FaRobot className="text-6xl mx-auto" />,
            title: "Chatbot",
            description: "Interact with our intelligent chatbot for assistance.",
        },
        {
            icon: <FaVideo className="text-6xl mx-auto" />,
            title: "Video Conference",
            description: "Join our immersive video conferences with ease.",
        },
        {
            icon: <FaChartLine className="text-6xl mx-auto" />,
            title: "Dashboard",
            description: "Analyze data and track your progress with our dashboard.",
        },
        {
            icon: <FaUpload className="text-6xl mx-auto" />,
            title: "File Upload",
            description: "Upload files quickly and securely to our platform.",
        },
        {
            icon: <FaMicrophone className="text-6xl mx-auto" />,
            title: "Speech Recognition",
            description: "Use speech recognition technology for convenient interactions.",
        },
        {
            icon: <FaFilePdf className="text-6xl mx-auto" />,
            title: "PDF Handling",
            description: "Effortlessly manage and handle PDF documents within our platform.",
        },
    ];
    const toggleCard = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const [formData, setFormData] = useState({
        body: '',
        email: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            email: formData.email,
            body: formData.body,
            text: formData.text
        };


        // Send email using EmailJS
        (emailjs.sendForm('service_p8cvxoc', 'template_1ndm55o', e.target, 'zhtZB-hASpip3O568')
            .then((result) => {
                console.log(result.text);
                // You can handle success message or redirect here
            }, (error) => {
                console.log(error);
                // You can handle error message here
            }));


        // Reset form data after submission
        setFormData({
            body: '',
            email: '',
            text: ''
        });
    };
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                            Our Vision
                            <br className="hidden lg:inline-block" />
                            Your remedies
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Speech to Text: Convert your spoken words into text, ensuring accurate and convenient communication.
                            Text Recognition: Extract text from images and documents, enabling you to quickly access important information.
                            Upload PDF: Securely upload medical records or other documents for easy sharing with healthcare providers.
                            Chatbot: Engage with our AI-powered chatbot for instant answers to your healthcare queries.
                            Videoconferencing: Connect with doctors and healthcare professionals from the comfort of your home or anywhere with an internet connection.
                            Our Commitment to Privacy
                        </p>

                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Subscribe
                            </button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="lg:max-w-lg lg:w-full md:w-1/2">
                        <img
                            className="object-cover object-center rounded h-full w-full opacity-75"
                            alt="hero"
                            src="https://img.freepik.com/premium-vector/group-doctors-consulting-with-each-other_179970-2906.jpg?w=2000"
                        />
                    </div>
                </div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 text-center">
                            <div className="p-4 sm:w-1/3 w-1/2">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="title-font font-medium text-xl text-gray-900 mb-4">Total Users</h2>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center w-20 h-20 bg-indigo-500 text-white rounded-full text-3xl font-bold">{totalUsers}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:w-1/3 w-1/2">
                                {/* <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="title-font font-medium text-xl text-gray-900 mb-4">Total Users</h2>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center w-20 h-20 bg-indigo-500 text-white rounded-full text-3xl font-bold">{totalUsers}</div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="p-4 sm:w-1/3 w-1/2">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="title-font font-medium text-xl text-gray-900 mb-4">Total Pdf</h2>
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center justify-center w-20 h-20 bg-indigo-500 text-white rounded-full text-3xl font-bold">{totalPdf}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
      
            <div className="min-h-screen bg-blue-300 flex flex-col justify-center items-center">
                <div className="max-w-4xl bg-green-300 p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
                    <p className="text-lg mb-8 text-center">Learn more about our exciting features!</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                index={index}
                                expanded={expandedIndex === index}
                                toggleCard={toggleCard}
                                {...feature}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-yellow-100">
                <div className="w-3/4 mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">
                        About Us
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget efficitur ante, quis dictum lorem. Nullam at bibendum purus. Nulla facilisi. Donec convallis ante ut augue molestie, a efficitur libero venenatis. Nunc vehicula consectetur felis, at lobortis lorem feugiat quis. Donec eget faucibus quam, ac laoreet tortor.
                    </p>
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-md mb-4 shadow-md transition duration-300 ease-in-out"
                            >
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                                    <svg
                                        className={`w-6 h-6 ${activeIndex === index ? "transform rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d={
                                                activeIndex === index
                                                    ? "M19 9l-7 7-7-7"
                                                    : "M5 15l7-7 7 7"
                                            }
                                        />
                                    </svg>
                                </div>
                                {activeIndex === index && (
                                    <p className="text-gray-600 mt-4">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-yellow-100">
                <div className="w-3/4 mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body" className="block mb-2">Body</label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="text" className="block mb-2">Text</label>
                        <input
                            type="text"
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                            const mailtoLink = `mailto:${formData.email}?subject=${encodeURIComponent(formData.body)}&body=${encodeURIComponent(formData.text)}`;
                            window.location.href = mailtoLink;
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>

        </>
    );
};

// const FeatureCard = ({ icon, title, description }) => {
//     return (
//         <div className="bg-gray-200 p-6 rounded-lg flex flex-col justify-center items-center">
//             {icon}
//             <h2 className="text-2xl font-bold my-4">{title}</h2>
//             <p className="text-lg text-center">{description}</p>
//         </div>
//     );
// };
const FeatureCard = ({ icon, title, description, color, expanded, toggleCard, index }) => {
    return (
        <div
            className={`bg-white p-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${color}`}
            onClick={() => toggleCard(index)}
        >
            <div className="flex items-center justify-between cursor-pointer">
                <div>
                    {icon}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <svg
                    className={`w-6 h-6 ${expanded ? "transform rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={expanded ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7"}
                    />
                </svg>
            </div>
            {expanded && <p className="text-gray-600 mt-4">{description}</p>}
        </div>
    );
};

export default AboutUs;
